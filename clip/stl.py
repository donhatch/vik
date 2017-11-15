#!/usr/bin/env python

# some stl utilities.

import math
import struct
import sys

# Like assert, but always compiled in
def CHECK(cond, message):
  if cond is True:
    return
  elif cond is False:
    raise AssertionError("CHECK failed: "+message)
  else:
    raise AssertionError("bad CHECK: neither True nor False")

def computeTriNormal(v0, v1, v2):
  u = [v1[0]-v0[0], v1[1]-v0[1], v1[2]-v0[2]]
  v = [v2[0]-v0[0], v2[1]-v0[1], v2[2]-v0[2]]
  normal = [u[1]*v[2]-u[2]*v[1],
            u[2]*v[0]-u[0]*v[2],
            u[0]*v[1]-u[1]*v[0]]
  length = math.sqrt(normal[0]**2 + normal[1]**2 + normal[2]**2)
  #print >>sys.stderr, "length = "+`length`
  CHECK(length != 0., 'triangle normal cross product is 0')
  normal[0] /= length
  normal[1] /= length
  normal[2] /= length
  return normal

def outputSTL(verts, inds):
  print 'solid csg.js'
  for triInds in inds:
    triVerts = [verts[i] for i in triInds]
    normal = computeTriNormal(triVerts[0], triVerts[1], triVerts[2])
    if False:  # apparently normals are in the expected direction: outwards, so don't reverse
      normal = [-normal[0], -normal[1], -normal[2]]  # reverse
    print 'facet normal '+`normal[0]`+' '+`normal[1]`+' '+`normal[2]`
    print 'outer loop'
    for vert in triVerts:
      print 'vertex '+`vert[0]`+' '+`vert[1]`+' '+`vert[2]`
    print 'endloop'
    print 'endfacet'
  print 'endsolid csg.js'

def inputLinesToTriNormalsAndTris(lines):
  lines = [line.rstrip() for line in lines]
  #print >>sys.stderr, "  lines = "+`lines`

  inputTriNormals = []
  inputTris = []

  iLine = 0; CHECK(iLine < len(lines), 'premature EOF on line '+`iLine+1`)
  CHECK(lines[iLine] == 'solid csg.js', "expected 'solid csg.js' on line "+`iLine+1`)
  iLine += 1; CHECK(iLine < len(lines), 'premature EOF on line '+`iLine+1`)
  while lines[iLine] != 'endsolid csg.js':
    tokens = lines[iLine].split()
    CHECK(len(tokens) == 5, "expected 'facet normal <x> <y> <z>' on line "+`iLine+1`)
    CHECK(tokens[0] == 'facet', "expected 'facet normal <x> <y> <z>' on line "+`iLine+1`)
    CHECK(tokens[1] == 'normal', "expected 'facet normal <x> <y> <z>' on line "+`iLine+1`)
    normalX = float(tokens[2])
    normalY = float(tokens[3])
    normalZ = float(tokens[4])
    inputTriNormals.append([normalX, normalY, normalZ])
    iLine += 1; CHECK(iLine < len(lines), 'premature EOF on line '+`iLine+1`)
    CHECK(lines[iLine] == 'outer loop', "expected 'outer loop' on line "+`iLine+1`)
    iLine += 1; CHECK(iLine < len(lines), 'premature EOF on line '+`iLine+1`)
    inputTris.append([])
    for iVert in xrange(3):
      tokens = lines[iLine].split()
      CHECK(len(tokens) == 4, "expected 'vertex <x> <y> <z>' on line "+`iLine+1`)
      CHECK(tokens[0] == 'vertex', "expected 'vertex <x> <y> <z>' on line "+`iLine+1`)
      x = float(tokens[1])
      y = float(tokens[2])
      z = float(tokens[3])
      inputTris[-1].append([x, y, z])
      iLine += 1; CHECK(iLine < len(lines), 'premature EOF on line '+`iLine+1`)
    CHECK(lines[iLine] == 'endloop', "expected 'endloop' on line "+`iLine+1`)
    iLine += 1; CHECK(iLine < len(lines), 'premature EOF on line '+`iLine+1`)
    CHECK(lines[iLine] == 'endfacet', "expected 'endfacet' on line "+`iLine+1`)
    iLine += 1; CHECK(iLine < len(lines), 'premature EOF on line '+`iLine+1`)
  return inputTriNormals, inputTris

def readSTLToTriNormalsAndTris(inStream):
  blob = inStream.read()
  if blob[:6] == 'solid ':
    print >>sys.stderr, "(it's ascii)",
    lines = blob.split('\n')
    return inputLinesToTriNormalsAndTris(lines)
  else:
    print >>sys.stderr, "(it's binary)",

    print >>sys.stderr, "len(blob) = "+`len(blob)`

    # https://en.wikipedia.org/wiki/STL_(file_format)#Color_in_binary_STL :

    #   UINT8[80] - Header
    #   UINT32 - Number of triangles

    #   foreach triangle
    #     REAL32[3] - Normal vector
    #     REAL32[3] - Vertex 1
    #     REAL32[3] - Vertex 2
    #     REAL32[3] - Vertex 3
    #     UINT16 - Attribute byte count
    #   end
    # Little endian.

    header = blob[:80]
    print >>sys.stderr, "header = "+`header`

    # < means little endian, I means unsigned int
    (nTris,) = struct.unpack('<I', blob[80:84])
    print >>sys.stderr, "nTris = "+`nTris`

    inputTriNormals = []
    inputTris = []

    for iTri in xrange(nTris):
      # < means little endian, f means float, H means unsigned short
      (nx,ny,nz,x0,y0,z0,x1,y1,z1,x2,y2,z2,attributeByteCount) = struct.unpack('<ffffffffffffH', blob[84+iTri*(12*4+2):84+(iTri+1)*(12*4+2)])
      assert attributeByteCount == 0
      if iTri == 0:
        print >>sys.stderr, "      iTri="+`iTri`+":"
        print >>sys.stderr, "          nx = "+`nx`
        print >>sys.stderr, "          ny = "+`ny`
        print >>sys.stderr, "          nz = "+`nz`
        print >>sys.stderr, "          x0 = "+`x0`
        print >>sys.stderr, "          y0 = "+`y0`
        print >>sys.stderr, "          z0 = "+`z0`
        print >>sys.stderr, "          x1 = "+`x1`
        print >>sys.stderr, "          y1 = "+`y1`
        print >>sys.stderr, "          z1 = "+`z1`
        print >>sys.stderr, "          x2 = "+`x2`
        print >>sys.stderr, "          y2 = "+`y2`
        print >>sys.stderr, "          z2 = "+`z2`
      inputTriNormals.append([nx,ny,nz])
      inputTris.append([[x0,y0,z0],[x1,y1,z1],[x2,y2,z2]])
    return inputTriNormals, inputTris

