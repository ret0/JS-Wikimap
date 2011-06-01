/**
 * returns new collection, both collections concatenated
 */
function addNodes(existingNodes, newNodes) {
    return existingNodes.concat(newNodes);
}

/**
 * returns new collection, nodes that are in "toBeDeleted"
 * are removed
 */
function removeNodes(existingNodes, toBeDeleted) {
    var updatedList = [];
    for(oldNode in existingNodes) {
        if(findIndex(toBeDeleted, existingNodes[oldNode].nodeName) == -1) {
            updatedList.push(existingNodes[oldNode]);
        }
    }
    return updatedList;
}

/**
 * returns the index of an element in the collection, -1 if not found
 */
function findIndex(collection, character) {
    for(element in collection) {
        if(collection[element].nodeName == character) {
            return parseInt(element);
        }
    }
    return -1;
}

/**
 * Transfers a name based link list into a index based one
 */
function transferToIndex(nodelist, linklist) {
    for(element in linklist) {
        linkobject = linklist[element];
        linkobject.source = findIndex(nodelist, linkobject.source);
        linkobject.target = findIndex(nodelist, linkobject.target);
    }
    return linklist
}

function addNode(newFrameIndex){
	var updatedList = addNodes(nodesInCurrentFrame, frameInformation[newFrameIndex].add); 
    updatedList = removeNodes(updatedList, frameInformation[newFrameIndex].del);
    var updatedLinks = transferToIndex(updatedList, frameInformation[newFrameIndex].links)

	nodesInCurrentFrame = updatedList;
	linksInCurrentFrame = updatedLinks;
    force.links(updatedLinks);
    force.nodes(updatedList);
    force.reset();
}