#!/usr/bin/env python

# hack of stlaFixTriangleOrientations.py
# that retains only the triangles in the plane of the top of the clip.
#
# I'M CONFUSED:
#   - when I convert the original to jscad and colorize it, it doesn't have excess tesselation.
#   - but when I convert to ascii, it *does* have excess tesselation. wtf?
#       I think it's the conversion back to stla that does that?  So, try to avoid that?

import math
import sys

import stl

# Like assert, but always compiled in
def CHECK(cond, message):
  if cond is True:
    return
  elif cond is False:
    raise AssertionError("CHECK failed: "+message)
  else:
    raise AssertionError("bad CHECK: neither True nor False")

# Takes a list of tris [[x0,y0,z0],[x1,y1,z1],[x2,y2,z2]]
# and outputs verts,inds where verts is a list of triples [x,y,z]
# and inds is a list of triples [i,j,k] of integers indexing into verts.
def convertTrisToVertsAndInds(tris):
  verts = []
  inds = []
  vert2ind = {}
  for tri in tris:
    inds.append([])
    for vert in tri:
      vertKey = tuple(vert)
      if vertKey not in vert2ind:
        vert2ind[vertKey] = len(verts)
        verts.append(vert)
      inds[-1].append(vert2ind[vertKey])
  return verts,inds

# Return the item in pair that's not i.
def otherOfPair(pair, i):
  a,b = pair  # makes sure it's actually a pair
  if a == i: return b
  if b == i: return a
  return None

# Here, tris is a list of integer triples [i,j,k].
# Returns the fixed tris, and also the signs for curiosity of the caller.
def makeTriOrientationsConsistent(tris):

  edge2triInds = {}
  for iTri in xrange(len(tris)):
    tri = tris[iTri]
    for iVertInTri in xrange(3):
      (i,j) = (tri[iVertInTri],tri[(iVertInTri+1)%3])
      if i > j: (i,j) = (j,i)  # canonical order
      if (i,j) not in edge2triInds:
        edge2triInds[(i,j)] = []
      edge2triInds[(i,j)].append(iTri)

  for edge in edge2triInds:
    CHECK(len(edge2triInds[edge]) == 2, "Error: edge "+`i`+","+`j`+" has "+`len(edge2triInds[edge])`+" incident tris")

  signs = [None] * len(tris)
  signs[0] = 1
  # a tri is placed on toDoList when its sign is chosen.
  toDoList = [0]

  for iTri in toDoList:  # while toDoList is growing
    if verboseLevel >= 3: print >>sys.stderr, '    iTri='+`iTri`+' sign='+`signs[iTri]`
    sign = signs[iTri]
    CHECK(sign is not None, 'signs['+`iTri`+'] is unexpectedly None')
    tri = tris[iTri]
    for iVertInTri in xrange(3):
      (i,j) = (tri[iVertInTri],tri[(iVertInTri+1)%3])
      key = (i,j)
      if key[0] > key[1]: key = (key[1],key[0])  # canonical order
      jTri = otherOfPair(edge2triInds[key], iTri)
      CHECK(jTri is not None, 'tris['+`iTri`+'] = '+`tris[iTri]`+' but didn\'t find '+`iTri`+' in edge2triInds['+`(i,j)`+']')
      trj = tris[jTri]
      if False:
        pass
      elif (i,j) in [(trj[0],trj[1]), (trj[1],trj[2]), (trj[2],trj[0])]:
        # Found it in same order it occurs in this triangle.
        signMultiplier = -1
      elif (i,j) in [(trj[1],trj[0]), (trj[2],trj[1]), (trj[0],trj[2])]:
        # Found it in opposite order from how it occurs in this triangle.
        signMultiplier = 1
      else:
        raise AssertionError('I\'m really confused')
      if signs[jTri] is None:
        # It's the first time we've seen neighbor-- assign its sign.
        signs[jTri] = signs[iTri] * signMultiplier
        toDoList.append(jTri)
        if verboseLevel >= 3: print >>sys.stderr, '        jTri='+`jTri`+' -> setting sign='+`signs[jTri]`
      else:
        # Neighbor was already assigned a sign-- make sure it's right.
        if verboseLevel >= 3: print >>sys.stderr, '        jTri='+`jTri`+' (already sign='+`signs[jTri]`+')'
        CHECK(signs[jTri] == signs[iTri] * signMultiplier, 'surface is non-orientable')
  CHECK(len(toDoList) == len(tris), 'len(toDoList)='+`len(toDoList)`+' != len(tris)='+`len(tris)`+'')
  answer = []
  for iTri in xrange(len(tris)):
    if signs[iTri] == 1:
      answer.append(tris[iTri])
    elif signs[iTri] == -1:
      answer.append((tris[iTri][2],tris[iTri][1],tris[iTri][0]))
    else:
      raise AssertionError('tri '+`iTri`+' sign is '+`signs[iTri]`)
  return answer,signs

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

def dot(a, b):
  answer = 0.
  for x,y in zip(a,b):
    answer += x*y
  return answer



if len(sys.argv) != 2:
  print >>sys.stderr, "Usage: "+sys.argv[0]+" <verboseLevel>  < in.stl > out.stl"
  print >>sys.stderr, "    verboseLevel=0: nothing to stderr"
  print >>sys.stderr, "    verboseLevel=1: and progress"
  print >>sys.stderr, "    verboseLevel=2: and signs (this is a good number)"
  print >>sys.stderr, "    verboseLevel=3: and verbose tri neighbor info"
  exit(1)

verboseLevel = int(sys.argv[1])

if False:
  if verboseLevel >= 1: print >>sys.stderr, "  Reading stdin... ",
  #inputBlob = sys.stdin.read();
  if verboseLevel >= 1: print >>sys.stderr, "done."

  if verboseLevel >= 1: print >>sys.stderr, "  Reading ascii stl file from stdin... ",
  inputLines = sys.stdin.readlines()
  if verboseLevel >= 1: print >>sys.stderr, "done."
  if verboseLevel >= 1: print >>sys.stderr, "  Parsing into tri normals and tris... ",
  inputTriNormals,inputTris = stl.inputLinesToTriNormalsAndTris(inputLines)
  if verboseLevel >= 1: print >>sys.stderr, "done."
else:
  if verboseLevel >= 1: print >>sys.stderr, "  Reading stl file from stdin... ",
  inputTriNormals,inputTris = stl.readSTLToTriNormalsAndTris(sys.stdin)
  if verboseLevel >= 1: print >>sys.stderr, "done."

#print >>sys.stderr, "  inputTriNormals = "+`inputTriNormals`
#print >>sys.stderr, "  inputTris = "+`inputTris`

if False:
  # Hmm, there are some needles :-(
  CHECK(len(inputTriNormals) == len(inputTris), 'len(inputTriNormals) = '+`len(inputTriNormals)`+' != len(inputTris)='+`len(inputTris)`)
  for iTri in xrange(len(inputTris)):
    print >>sys.stderr, '      iTri='+`iTri`
    tri = inputTris[iTri]
    normal = inputTriNormals[iTri]
    print >>sys.stderr, '                  normal = '+`normal`
    computedNormal = computeTriNormal(tri[0], tri[1], tri[2])
    print >>sys.stderr, '          computedNormal = '+`computedNormal`
    dotProduct = dot(normal, computedNormal)
    print >>sys.stderr, '              dotProduct = '+`dotProduct`
    #CHECK(abs(dotProduct - 1.) < 1e-9, 'Oh no! dot product is '+`dotProduct`+' != 1')

    if True:
      # fix!
      inputTriNormals[iTri] = computedNormal
  sys.exit(1)

if verboseLevel >= 1: print >>sys.stderr, "  Converting into verts and indices...",
verts,triInds = convertTrisToVertsAndInds(inputTris)
if verboseLevel >= 1: print >>sys.stderr, "done."

if False:
  if verboseLevel >= 1: print >>sys.stderr, "  Making tri orientations consistent...",
  triInds,signs = makeTriOrientationsConsistent(triInds)
  if verboseLevel >= 1: print >>sys.stderr, "done."
  if verboseLevel >= 2: print >>sys.stderr, '    signs = '+`signs`

if True:
  # retain only those tris lying at z coord 5.1 (give or take 1e-4)
  if verboseLevel >= 1: print >>sys.stderr, "  Retaining only those tris at z coord 5.1 (give or take 1e-4)...",
  if verboseLevel >= 1: print >>sys.stderr, "(before: "+`len(triInds)`+" tris)",
  triIndsFiltered = []
  for tri in triInds:
    if (abs(verts[tri[0]][2] - 5.1) <= 1e-4 and
        abs(verts[tri[1]][2] - 5.1) <= 1e-4 and
        abs(verts[tri[2]][2] - 5.1) <= 1e-4):
      triIndsFiltered.append(tri)
  triInds = triIndsFiltered
  if verboseLevel >= 1: print >>sys.stderr, "(after: "+`len(triInds)`+" tris)",
  if verboseLevel >= 1: print >>sys.stderr, "done."

if verboseLevel >= 1: print >>sys.stderr, "  Printing STL to stdout...",
stl.outputSTL(verts, triInds)
if verboseLevel >= 1: print >>sys.stderr, "done."


