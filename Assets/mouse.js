
var pointPrefab : GameObject;
var linePrefab : GameObject;

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
		
		addLine(BoardLoader.lastPositionX,BoardLoader.lastPositionY,newLastX,newLastY);
				
		BoardLoader.lastPositionX = newLastX;
		BoardLoader.lastPositionY = newLastY;
		
		
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


function addLine(x1:int,y1:int,x2:int,y2:int){


if (x1 > x2)
{
 var tx = x2;
 x2 = x1;
 x1 = tx;
}

if (y1 > y2)
{
 var ty = y2;
 y2 = y1;
 y1 = ty;
}

var deltaX = 0;
var deltaY = 0;

if (x2 - x1 > 0){
	deltaX = 1;
}

if (x2 - x1 < 0){
	deltaX = -1;
}


if (y2 - y1 > 0){
	deltaY = 1;
}

if (y2 - y1 < 0){
	deltaY = -1;
}


Debug.Log("Delta  "+deltaX+" "+deltaY+" ");

var i = x1;
var j = y1;

var done = 0;

while( (x2 - i + y2 - j > 0))
{
	addPoint(i,j);
	
	if ( (i+deltaX) <=x2 && (j+deltaY) <= y2){
	
		addLineUnit(i,j,i+deltaX,j+deltaY);
	
	}
		
	i+=deltaX;
	j+=deltaY;
		
}

i = x1;
j = y1;

}

function addPoint(x:int,y:int){
	var instance : GameObject = Instantiate(pointPrefab, Vector3(x * BoardLoader.lineSize + 0.5f, y * BoardLoader.lineSize + 0.5f, 0), Quaternion.identity);
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
		instance.transform.rotation = Quaternion.FromToRotation (Vector3.forward, Vector3(x2-x1,y1-y2,0));
	}
	
}

