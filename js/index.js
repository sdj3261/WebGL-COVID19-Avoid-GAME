var container, scene, camera, renderer, controls;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock;

var movingCube;
var collideMeshList = [];
var collideMeshList2 = [];
var cubes = [];
var Bonus = [];
var message = document.getElementById("message");
var crash = false;
var crash2 = false;
var score = 100;
var scoreText = document.getElementById("score");
var stageText = document.getElementById("stage");
var id = 0;
var id2 = 0;
var crashId = " ";
var lastCrashId = " ";
var crashId2 = " ";
var lastCrashId2 = " ";
var pause = false;
var floor;

init();
animate();

function init() {
    // Scene
    scene = new THREE.Scene();

    var light_sun = new THREE.DirectionalLight ( 0x808080, 5.0 );
    light_sun.position.set( 50, 200, 300 );
    scene.add( light_sun );

    // Camera
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;
    camera = new THREE.PerspectiveCamera(60, screenWidth / screenHeight, 1, 20000);
    camera.position.set(0, 80, 160);

    // Renderer
    if (Detector.webgl) {
        renderer = new THREE.WebGLRenderer({ antialias: false, preserveDrawingBuffer: true });
    } else {
        renderer = new THREE.CanvasRenderer();
    }
    renderer = new THREE.WebGLRenderer( { alpha: true, antialias: false, preserveDrawingBuffer: true } ); // init like this
    renderer.setClearColor( 0xff0000, 0 );

    renderer.setSize(screenWidth * 0.95, screenHeight * 0.95);
    container = document.getElementById("ThreeJS");
    container.appendChild(renderer.domElement);

    THREEx.WindowResize(renderer, camera);
    controls = new THREE.OrbitControls(camera, renderer.domElement);


    //Floor
    var floorMaterial = new THREE.MeshBasicMaterial({
        color: 0xD7A45E,
        side: THREE.DoubleSide
    });
    var floorGeometry = new THREE.PlaneGeometry(600, 10000, 10, 10);
    floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -0.5;
    floor.rotation.x = Math.PI / 2;
    scene.add(floor);

    //Floor Line 1
    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(-250, -1, -3000));
    geometry.vertices.push(new THREE.Vector3(-300, -1, 200));
    material = new THREE.LineBasicMaterial({
        color: 0x5a5a5a, linewidth: 200, morphTargets: true
    });
    var line1 = new THREE.Line(geometry, material);
    scene.add(line1);

    //Floor Line 2
    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(250, -1, -3000));
    geometry.vertices.push(new THREE.Vector3(300, -1, 200));
    var line2 = new THREE.Line(geometry, material);
    scene.add(line2);

    //Material Definition

    var darkMaterial1 = new THREE.MeshPhongMaterial( { color: 0x8B4513 } );
    var wireframeMaterial1 = new THREE.MeshPhongMaterial( { color:  0x8B4513, wireframe: false, transparent: true } );
    var multiMaterial1 = [ darkMaterial1, wireframeMaterial1 ];

    var darkMaterial2 = new THREE.MeshPhongMaterial( { color:  0x006400 } );
    var wireframeMaterial2 = new THREE.MeshPhongMaterial( { color:  0x006400, wireframe: false, transparent: true } );
    var multiMaterial2 = [ darkMaterial2, wireframeMaterial2 ];

    //Tree and leaf

    var tree = THREE.SceneUtils.createMultiMaterialObject(
        new THREE.CubeGeometry(10, 50, 10, 1, 1, 1),
        multiMaterial1 );
    tree.position.set(-303, 20, -150); // x z y
    scene.add( tree );

    var leaf1 = THREE.SceneUtils.createMultiMaterialObject(
        // radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight,
        new THREE.CylinderGeometry( 0, 30, 50, 20, 4 ),
        multiMaterial2 );
    leaf1.position.set(-300, 70, -150);
    scene.add( leaf1 );

    var leaf2 = THREE.SceneUtils.createMultiMaterialObject(
        // radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight,
        new THREE.CylinderGeometry( 0, 30, 50, 20, 4 ),
        multiMaterial2 );
    leaf2.position.set(-300, 120, -150);
    scene.add( leaf2 );

    var tree2 = THREE.SceneUtils.createMultiMaterialObject(
        new THREE.CubeGeometry(10, 50, 10, 1, 1, 1),
        multiMaterial1 );
    tree2.position.set(-303, 20, -400); // x z y
    scene.add( tree2 );

    var leaf3 = THREE.SceneUtils.createMultiMaterialObject(
        // radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight,
        new THREE.CylinderGeometry( 0, 30, 50, 20, 4 ),
        multiMaterial2 );
    leaf3.position.set(-300, 70, -400);
    scene.add( leaf3 );

    var leaf4 = THREE.SceneUtils.createMultiMaterialObject(
        // radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight,
        new THREE.CylinderGeometry( 0, 30, 50, 20, 4 ),
        multiMaterial2 );
    leaf4.position.set(-300, 120, -400);
    scene.add( leaf4 );

    var tree3 = THREE.SceneUtils.createMultiMaterialObject(
        new THREE.CubeGeometry(10, 50, 10, 1, 1, 1),
        multiMaterial1 );
    tree3.position.set(-303, 20, -700); // x z y
    scene.add( tree3 );

    var leaf5 = THREE.SceneUtils.createMultiMaterialObject(
        // radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight,
        new THREE.CylinderGeometry( 0, 30, 50, 20, 4 ),
        multiMaterial2 );
    leaf5.position.set(-300, 70, -700);
    scene.add( leaf5 );

    var leaf6 = THREE.SceneUtils.createMultiMaterialObject(
        // radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight,
        new THREE.CylinderGeometry( 0, 30, 50, 20, 4 ),
        multiMaterial2 );
    leaf6.position.set(-300, 120, -700);
    scene.add( leaf6 );

    var tree4 = THREE.SceneUtils.createMultiMaterialObject(
        new THREE.CubeGeometry(10, 50, 10, 1, 1, 1),
        multiMaterial1 );
    tree4.position.set(-303, 20, -1050); // x z y
    scene.add( tree4 );

    var leaf7 = THREE.SceneUtils.createMultiMaterialObject(
        // radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight,
        new THREE.CylinderGeometry( 0, 30, 50, 20, 4 ),
        multiMaterial2 );
    leaf7.position.set(-300, 70, -1050);
    scene.add( leaf7 );

    var leaf8 = THREE.SceneUtils.createMultiMaterialObject(
        // radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight,
        new THREE.CylinderGeometry( 0, 30, 50, 20, 4 ),
        multiMaterial2 );
    leaf8.position.set(-300, 120, -1050);
    scene.add( leaf8 );

    //other side

    var tree5 = THREE.SceneUtils.createMultiMaterialObject(
        new THREE.CubeGeometry(10, 50, 10, 1, 1, 1),
        multiMaterial1 );
    tree5.position.set(303, 20, -150); // x z y
    scene.add( tree5 );

    var leaf9 = THREE.SceneUtils.createMultiMaterialObject(
        // radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight,
        new THREE.CylinderGeometry( 0, 30, 50, 20, 4 ),
        multiMaterial2 );
    leaf9.position.set(300, 70, -150);
    scene.add( leaf9 );

    var leaf10 = THREE.SceneUtils.createMultiMaterialObject(
        // radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight,
        new THREE.CylinderGeometry( 0, 30, 50, 20, 4 ),
        multiMaterial2 );
    leaf10.position.set(300, 120, -150);
    scene.add( leaf10 );

    var tree6 = THREE.SceneUtils.createMultiMaterialObject(
        new THREE.CubeGeometry(10, 50, 10, 1, 1, 1),
        multiMaterial1 );
    tree6.position.set(303, 20, -400); // x z y
    scene.add( tree6 );

    var leaf11 = THREE.SceneUtils.createMultiMaterialObject(
        // radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight,
        new THREE.CylinderGeometry( 0, 30, 50, 20, 4 ),
        multiMaterial2 );
    leaf11.position.set(300, 70, -400);
    scene.add( leaf11 );

    var leaf12 = THREE.SceneUtils.createMultiMaterialObject(
        // radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight,
        new THREE.CylinderGeometry( 0, 30, 50, 20, 4 ),
        multiMaterial2 );
    leaf12.position.set(300, 120, -400);
    scene.add( leaf12 );

    var tree7 = THREE.SceneUtils.createMultiMaterialObject(
        new THREE.CubeGeometry(10, 50, 10, 1, 1, 1),
        multiMaterial1 );
    tree7.position.set(303, 20, -700); // x z y
    scene.add( tree7 );

    var leaf13 = THREE.SceneUtils.createMultiMaterialObject(
        // radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight,
        new THREE.CylinderGeometry( 0, 30, 50, 20, 4 ),
        multiMaterial2 );
    leaf13.position.set(300, 70, -700);
    scene.add( leaf13 );

    var leaf14 = THREE.SceneUtils.createMultiMaterialObject(
        // radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight,
        new THREE.CylinderGeometry( 0, 30, 50, 20, 4 ),
        multiMaterial2 );
    leaf14.position.set(300, 120, -700);
    scene.add( leaf14 );

    var tree8 = THREE.SceneUtils.createMultiMaterialObject(
        new THREE.CubeGeometry(10, 50, 10, 1, 1, 1),
        multiMaterial1 );
    tree8.position.set(303, 20, -1050); // x z y
    scene.add( tree8 );

    var leaf15 = THREE.SceneUtils.createMultiMaterialObject(
        // radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight,
        new THREE.CylinderGeometry( 0, 30, 50, 20, 4 ),
        multiMaterial2 );
    leaf15.position.set(300, 70, -1050);
    scene.add( leaf15 );

    var leaf16 = THREE.SceneUtils.createMultiMaterialObject(
        // radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight,
        new THREE.CylinderGeometry( 0, 30, 50, 20, 4 ),
        multiMaterial2 );
    leaf16.position.set(300, 120, -1050);
    scene.add( leaf16 );


    //MovingCube Camera

    var cubeGeometry = new THREE.CubeGeometry(48, 25, 45, 5, 5, 5);
    var wireMaterial = new THREE.MeshBasicMaterial({
        color: 0xC71585,
    });

    movingCube = new THREE.Mesh(cubeGeometry, wireMaterial);
    //            movingCube = new THREE.Mesh(cubeGeometry, material);
    //            movingCube = new THREE.BoxHelper(movingCube);
    movingCube.position.set(0, 25, -20);
    scene.add(movingCube);

    //Animation pause, Game restart Button
    var pause2 = document.getElementById("pause");
    var restart2 = document.getElementById("restart")

    pause2.onclick = function () {
        if(score>0)
            pause = !pause;
    }

    restart2.onclick = function () {
        pause=false;
        window.location.reload(true);
    };

}

function animate() {
    //requestAnimation and rendering
    requestAnimationFrame( animate );

    if(score < 0) {
        stageText.innerText = "Game Over!! Click Restart Button";
        stageText.style.color ="red";
        pause = true;
    }
    if(pause == false) {
        update();
    }

    renderer.render(scene, camera);
}

function update() {
    //Animation Update data

    //background color change
    if(stageText.innerText == "Stage 1") {
        var speed = 1.5;
        $("body").css("transition", "7s");
        $("body").css("background", "#A7EEFF");
    }
    else if(stageText.innerText == "Stage 2") {
        var speed = 2;
        $("body").css("transition", "7s");
        $("body").css("background", "#FF8000");
    }
    else if(stageText.innerText =="Stage 3") {
        $("body").css("transition", "7s");
        $("body").css("background", "#000000");
        var speed = 2.5;
    }


    //score , stage check
    var delta = speed * clock.getDelta();
    var moveDistance = 200 * delta;
    //console.log(moveDistance);
    var rotateAngle = Math.PI / 2 * delta;

    if(score >= 500 && score < 1000)
    {
        stageText.innerText = "Stage 2";
    }
    else if(score >= 1000)
    {
        stageText.innerText = "Stage 3";
    }
    else if(score >= 0 && score < 500)
    {
        stageText.innerText = "Stage 1";
    }
    else
        stageText.innerText = "Game Over!! Click Restart Button";


    //KeyEvent LEFT,RIGHT
    if (keyboard.pressed("left") || keyboard.pressed("A")) {
        if (movingCube.position.x > -200)
            movingCube.position.x -= moveDistance;
        if (camera.position.x > -150) {
            camera.position.x -= moveDistance * 0.6;
            if (camera.rotation.z > -5 * Math.PI / 180) {
                camera.rotation.z -= 0.2 * Math.PI / 180;
            }
        }
    }
    if (keyboard.pressed("right") || keyboard.pressed("D")) {
        if (movingCube.position.x < 200)
            movingCube.position.x += moveDistance;
        if (camera.position.x < 150) {
            camera.position.x += moveDistance * 0.6;
            if (camera.rotation.z < 5 * Math.PI / 180) {
                camera.rotation.z += 0.2 * Math.PI / 180;
            }
        }
    }

    if (!(keyboard.pressed("left") || keyboard.pressed("right") ||
        keyboard.pressed("A") || keyboard.pressed("D"))) {
        delta = camera.rotation.z;
        camera.rotation.z -= delta / 10;
    }

    //Collision Detection Covid , Mask
    var originPoint = movingCube.position.clone();

    for (var vertexIndex = 0; vertexIndex < movingCube.geometry.vertices.length; vertexIndex++) {
        var localVertex = movingCube.geometry.vertices[vertexIndex].clone();
        var globalVertex = localVertex.applyMatrix4(movingCube.matrix);
        var directionVector = globalVertex.sub(movingCube.position);

        var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
        var collisionResults = ray.intersectObjects(collideMeshList);
        var collisionResults2 = ray.intersectObjects(collideMeshList2);

        if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
            crash = true;
            crashId = collisionResults[0].object.name;
            break;
        }
        if (collisionResults2.length > 0 && collisionResults2[0].distance < directionVector.length()) {
            crash2 = true;
            crashId2 = collisionResults2[0].object.name;
            break;
        }

        crash = false;
        crash2 = false;
    }

    //Collision result Covid
    if (crash) {
        movingCube.material.color.setHex(0xFF0000);
        if (crashId !== lastCrashId) {
            score -= 100;
            lastCrashId = crashId;
        }

        document.getElementById('explode_sound').play()
    }

    //Collision result mask
    else if(crash2)
    {
        movingCube.material.color.setHex(0x60FD81);
        if (crashId2 !== lastCrashId2) {
            score += 30;
            lastCrashId2 = crashId2;
        }
        document.getElementById('mask_sound').play()
    }
    else {
        movingCube.material.color.setHex(0xF2D0AE);
    }


    //Covid Random generate
    if (Math.random() < 0.03 && cubes.length < 20 &&  stageText.innerText == "Stage 1") {
        makeRandomCube();
    }
    else if (Math.random() < 0.05 && cubes.length < 25 &&  stageText.innerText == "Stage 2") {
        makeRandomCube();
    }
    else if (Math.random() < 0.07 && cubes.length < 30 &&  stageText.innerText == "Stage 3") {
        makeRandomCube();
    }

    //Mask item Random generate
    if (Math.random() < 0.007) {
        makeRandomBonus();
    }

    //Covid speed with stage

    for (i = 0; i < cubes.length; i++) {
        if (cubes[i].position.z > camera.position.z) {
            scene.remove(cubes[i]);
            cubes.splice(i, 1);
            collideMeshList.splice(i, 1);
        } else {
            if(stageText.innerText == "Stage 1")
                cubes[i].position.z += 13;
            else if(stageText.innerText == "Stage 2")
                cubes[i].position.z += 15;
            else if(stageText.innerText == "Stage 3") {
                cubes[i].position.z += 20;
            }
        }
        //                renderer.render(scene, camera);
    }

    //mask item speed with stage

    for (i = 0; i < Bonus.length; i++) {
        if (Bonus[i].position.z > camera.position.z) {
            scene.remove(Bonus[i]);
            Bonus.splice(i, 1);
            collideMeshList2.splice(i, 1);
        } else {
            if(stageText.innerText == "Stage 1")
                Bonus[i].position.z += 15;
            else if(stageText.innerText == "Stage 2")
                Bonus[i].position.z += 17;
            else if(stageText.innerText == "Stage 3") {
                Bonus[i].position.z += 22;
            }
        }
        //                renderer.render(scene, camera);
    }

    //clock per score up

    score += 0.2;
    scoreText.innerText = "Score : " + Math.floor(score);

}

//easy to make function
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//Covid Item generate with random human texture
function makeRandomCube() {
    var a = 1 * 50,
        b = getRandomInt(1, 3) * 50,
        c = 1 * 50;

    var url = new Array('data:image/jpeg;base64,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',
        'data:image/jpeg;base64,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',
        'data:image/jpeg;base64,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',
        'data:image/jpeg;base64,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',
        'data:image/jpeg;base64,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',
        'data:image/jpeg;base64,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',
        'data:image/jpeg;base64,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',
    )

    var texture = new THREE.TextureLoader().load(randomItem(url));
    var geometry = new THREE.CubeGeometry(a, b, c);
    var material = new THREE.MeshBasicMaterial({
        map: texture,
        color: 0xFFFFFF,
        size: 4,
    });


    var object = new THREE.Mesh(geometry, material);
    object.material.color.setHex(0xFFFFFF);

    object.position.x = getRandomArbitrary(-250, 250);
    object.position.y = 1 + b / 2;
    object.position.z = getRandomArbitrary(-800, -1200);
    cubes.push(object);

    object.name = "box_" + id;
    id++;
    collideMeshList.push(object);

    scene.add(object);
}

// mask Item generate with texture
function makeRandomBonus() {
    var a = 1 * 50,
        b = 40,
        c = 40,
        d = 1 * 50,
        e = 1 * 50,
        f = 1 * 50,
        g = 1 * 50;

    var texture = new THREE.TextureLoader().load( 'textures/mask.jpg' );
    var geometry = new THREE.BoxGeometry(a, b, c, d, e, f, g);
    material = new THREE.MeshBasicMaterial( { map: texture } );

    var object2 = new THREE.Mesh(geometry, material);
    object2.material.color.setHex(0xFFFFFF);
    object2.position.x = getRandomArbitrary(-250, 250);
    object2.position.y = 1 + b / 2;
    object2.position.z = getRandomArbitrary(-1000, -1600);
    Bonus.push(object2);

    object2.name = "bonus_" + id2;
    id2++;
    collideMeshList2.push(object2);
    scene.add(object2);
}

function randomItem(a) {
    return a[Math.floor(Math.random()*a.length)];
}