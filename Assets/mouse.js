
var pointPrefab : GameObject;
var linePrefab : GameObject;
var lastPositionPrefab : GameObject;

function OnMouseDown() {

 

  var lastPos = Vector3(BoardLoader.lastPositionX*BoardLoader.lineSize,BoardLoader.lastPositionY*BoardLoader.lineSize,0);

  var dist = Vector3.Distance(lastPos, transform.position);
  

  
	if (dist < (BoardLoader.lineSize * 1.5f))
	 {
		var direction = transform.position - lastPos;
		
		direction.x = direction.x / 10;
		direction.y = direction.y / 10;
		direction.z = direction.z / 10;
		
		Debug.Log("Direction  "+direction.x+" "+direction.y+" "+direction.z);
				
		var newLastX = BoardLoader.lastPositionX;
		var newLastY = BoardLoader.lastPositionY;
		
		if (direction.normalized.x > 0){
			newLastX += 1;
		}
		
		if (direction.normalized.x < 0){
			newLastX -= 1;
		}
		
		if (direction.normalized.y > 0){
			newLastY += 1;
		}
		
		
		if (direction.normalized.y < 0){
			newLastY -= 1;
		}
		
		addLineUnit(BoardLoader.lastPositionX,BoardLoader.lastPositionY,newLastX,newLastY);
				
		BoardLoader.lastPositionX = newLastX;
		BoardLoader.lastPositionY = newLastY;
		
		setLastPosition(newLastX,newLastY);
		
	  }
	  else{
	    Debug.Log("Dist "+dist);
	}


}

function OnMouseUp() {

}

function OnMouseEnter() {

}

function OnMouseExit() {
}


function Update () {
}


function addLineUnit(x1:int,y1:int,x2:int,y2:int){
	var instance : GameObject = Instantiate(linePrefab, Vector3((x1+(x2-x1)/2.0f) * BoardLoader.lineSize, (y1+(y2-y1)/2.0f) *BoardLoader.lineSize, 0), Quaternion.identity);
 
    if (x1 == x2 && y2 != y1) {
	instance.transform.localScale = Vector3(1,(y2-y1)*BoardLoader.lineSize,1);
	}
	else
	if (y1 == y2 && x2 != x1){
	instance.transform.localScale = Vector3((x2-x1)*BoardLoader.lineSize,1,1);
	}
	else{
		instance.transform.localScale = Vector3(Mathf.Sqrt(2)*(BoardLoader.lineSize+1),1,1);
		
		var dir;
		
		if ( (x2-x1)>0){
			if ( (y2-y1)  > 0){
				dir = Vector3(1,1,0);
			}
			else{
				dir = Vector3(1,-1,0);
			}
		}
		else{
			if ( (y2-y1)  > 0){
				dir = Vector3(-1,1,0);
			}
			else{
				dir = Vector3(-1,-1,0);
			}
		}

		instance.transform.rotation = Quaternion.FromToRotation (Vector3(1,0,0), dir.normalized);
	}
	
}

function setLastPosition(x:int,y:int){
	if (BoardLoader.lastPositionMarker != null){
		Destroy(BoardLoader.lastPositionMarker);
	}
	
	lastPositionX = x;
	lastPositionY = y;

	BoardLoader.lastPositionMarker= Instantiate(lastPositionPrefab, Vector3(x * BoardLoader.lineSize, y * BoardLoader.lineSize, 0), Quaternion.identity);
	BoardLoader.lastPositionMarker.renderer.material.SetColor("_Color",Color.red);
    BoardLoader.lastPositionMarker.renderer.material.color.a = 0.5f;
	BoardLoader.lastPositionMarker.transform.localScale = Vector3(BoardLoader.lineSize/3.0f,BoardLoader.lineSize/3.0f,1);
}

