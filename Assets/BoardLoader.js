import System.IO;

var filePath = "/Boards/board01.txt";
var gameboard;
var lines;
var sizeX = 0;
var sizeY = 0;
static var lineSize = 10;
var cameraZoom = 3;

var dotPrefab : GameObject;
var pointPrefab : GameObject;
var linePrefab : GameObject;
var gateAPrefab : GameObject;
var gateBPrefab : GameObject;
var mainCamera : GameObject;
var lastPositionPrefab : GameObject;

static var lastPositionX = 0;
static var lastPositionY = 0;
static var lastPositionMarker : GameObject;

var playerATurn = 1;
var playerBTurn = 0;
var playerAMoved = 0;
var playerBMoved = 0;



function Start () {
loadBoard(filePath);
/*
addLineUnit(0,0,1,1);
addLineUnit(0,0,-1,-1);
addLineUnit(0,0,1,-1);
addLineUnit(0,0,-1,1);
addLineUnit(0,0,1,0);*/


}

function loadBoard(filepathIncludingFileName : String) {
	sr = new File.OpenText(Application.dataPath+filepathIncludingFileName);
	input = "";
	while (true) {
		input = sr.ReadLine();
		
		if (input == null) { break; }
		
		Debug.Log(""+input);
		
		tokens = input.Split(" "[0]);
	
		/*
		for(i=0;i<tokens.length;i++){
			Debug.Log(tokens[i]);
		}
		*/
		
		if (tokens[0] == "Size"){
			initBoard(parseInt(tokens[1]),parseInt(tokens[2]));
		}
		
		if (tokens[0] == "Line"){
			addLine(parseInt(tokens[1]),parseInt(tokens[2]),parseInt(tokens[3]),parseInt(tokens[4]));
		}
		
		if (tokens[0] == "GateA"){
			addGateA(parseInt(tokens[1]),parseInt(tokens[2]));
		}
		
		if (tokens[0] == "GateB"){
			addGateB(parseInt(tokens[1]),parseInt(tokens[2]));
		}
		
		if (tokens[0] == "LastPosition"){
			setLastPosition(parseInt(tokens[1]),parseInt(tokens[2]));
		}
		
	}
	sr.Close();
}




function initBoard(x:int, y:int){
var i;
sizeX = x;
sizeY = y;

mainCamera.transform.position = Vector3(x/2.0f * cameraZoom,y/2.0f * cameraZoom, -(x+y)*cameraZoom);

gameboard = new Array(sizeY);



for(i=0;i<sizeY;i++){
	gameboard[i]=new Array(sizeX);
}


for(y=0;y<sizeY;y++){
	for(x=0;x<sizeX;x++){
		addDot(x,y);
	}
}

}

function setLastPosition(x:int,y:int){
	if (lastPositionMarker != null){
		Destroy(lastPositionMarker);
	}
	
	lastPositionX = x;
	lastPositionY = y;

	lastPositionMarker= Instantiate(lastPositionPrefab, Vector3(x * lineSize, y * lineSize, 0), Quaternion.identity);
	lastPositionMarker.renderer.material.SetColor("_Color",Color.red);
    lastPositionMarker.renderer.material.color.a = 0.5f;
	lastPositionMarker.transform.localScale = Vector3(lineSize/3.0f,lineSize/3.0f,1);
}

function addDot(x:int,y:int){
	var instance : GameObject = Instantiate(dotPrefab, Vector3(x * lineSize, y * lineSize, 0), Quaternion.identity);
	instance.transform.localScale = Vector3(2,2,2);
	instance.renderer.material.SetColor("_Color",Color.gray);
    instance.renderer.material.color.a = 0.5f;
	
}

function addGateA(x:int,y:int){
		var instance : GameObject = Instantiate(gateAPrefab, Vector3(x * lineSize, y * lineSize, 0), Quaternion.identity);
		instance.renderer.material.SetColor ("_Color", Color.red);
		instance.transform.localScale = Vector3(5,5,1);
}

function addGateB(x:int,y:int){
		var instance : GameObject = Instantiate(gateBPrefab, Vector3(x * lineSize, y * lineSize, 0), Quaternion.identity);
		instance.renderer.material.SetColor ("_Color", Color.blue);
		instance.transform.localScale = Vector3(5,5,1);
}


function addLine(x1:int,y1:int,x2:int,y2:int){
/*
x1 = sizeX/2;
y1 = sizeY - y1;
x2 = sizeX/2;
y2 = sizeY - y2;*/

if (x1 == x2)
	{
		for(i=y1;i<=y2;i++){
			addPoint(x1,i);
		}
		for(i=y1;i<y2;i++){
			addLineUnit(x1,i,x1,i+1);
		}
	}

if (y1 == y2){
	for(i=x1;i<=x2;i++){
			addPoint(i,y1);
		}
	for(i=x1;i<x2;i++){
			addLineUnit(i,y1,i+1,y1);
		}	
}

}

function addPoint(x:int,y:int){
	var instance : GameObject = Instantiate(pointPrefab, Vector3(x * lineSize + 0.5f, y * lineSize + 0.5f, 0), Quaternion.identity);
	gameboard[x][y] = 1;
}

function addLineUnit(x1:int,y1:int,x2:int,y2:int){
	var instance : GameObject = Instantiate(linePrefab, Vector3((x1+(x2-x1)/2.0f) * lineSize, (y1+(y2-y1)/2.0f) * lineSize, 0), Quaternion.identity);
 
    if (x1 == x2 && y2 != y1) {
	instance.transform.localScale = Vector3(1,(y2-y1)*lineSize,1);
	}
	else
	if (y1 == y2 && x2 != x1){
	instance.transform.localScale = Vector3((x2-x1)*lineSize,1,1);
	}
	else{
		instance.transform.localScale = Vector3(Mathf.Sqrt(2)*(lineSize+1),1,1);
		instance.transform.rotation = Quaternion.FromToRotation (Vector3.forward, Vector3(x2-x1,y1-y2,0));
	}
	
}

var wasClicked : boolean;

function OnMouseDown() {
  Debug.Log("mouseDown");
}

function OnMouseUp() {
 Debug.Log("mouseUP");
}

function OnMouseEnter() {

}

function OnMouseExit() {
}


function Update () {

	if (playerAMoved == 1){
		playerAMoved = 0;
		playerBTurn = 1;
		playerBMoved = 0;
		UnityEditor.EditorUtility.DisplayDialog("Nex player", "Player B's Turn", "Yes", "Yes");
	}
	
	if (playerBMoved == 1){
		playerBMoved = 0;
		playerATurn = 1;
		playerAMoved = 0;
		UnityEditor.EditorUtility.DisplayDialog("Nex player", "Player A's Turn", "Yes", "Yes");
	}
	
	

}
