// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')

//设置场景的大小
var width = window.innerWidth;
var height = window.innerHeight;
var numberOfObjects = 500
//创建场景
var scene = new THREE.Scene();
//设置相机（视野，显示口的宽高比，近裁剪面，远裁剪面）
var camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 10000 );
//渲染器
var renderer = new THREE.WebGLRenderer({antialias: true}); // antialias平滑
//设置渲染器的高度和宽度，如果加上第三个值 false，则按场景大小显示，等比例缩放
renderer.setSize(width, height,false);
//将渲染器添加到html当中
document.body.appendChild( renderer.domElement );

//将相机沿z轴偏移
camera.position.z = 100;
//把相机添加到场景里面
scene.add(camera);

// 球形
const geometry = new THREE.SphereGeometry( 10, 32, 16 );
//使用网孔基础材料（MeshBasicMaterial）进行着色器，这里只绘制了一个绿色
// var material = new THREE.MeshLambertMaterial( { color: 0xFFF000 } );
// MeshLambertMaterial 这种材质可以用来创建暗淡的并不光亮的表面

//首先，获取到纹理
var map = THREE.ImageUtils.loadTexture("src/assets/moon6.png");

//然后创建一个phong材质来处理着色，并传递给纹理映射
var material = new THREE.MeshPhongMaterial({map: map});

//使用网孔(Mesh)来承载几何模型
var sphere = new THREE.Mesh( geometry, material );
//将模型添加到场景当中
scene.add( sphere );


// 点光
var pointLight = new THREE.PointLight(0XFFFFFF, 1, 2000);
pointLight.position.x = 180;
pointLight.position.y = 100;
pointLight.position.z = 150;
scene.add(pointLight);

// 氛围灯
const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

// White directional light at half intensity shining from the top.
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add( directionalLight );


//用户交互插件 鼠标左键按住旋转，右键按住平移，滚轮缩放
var controls,clock;
function initControls() {
  controls = new THREE.OrbitControls( camera, renderer.domElement );

  // 如果使用animate方法时，将此函数删除
  //controls.addEventListener( 'change', render );
  // 使动画循环使用时阻尼或自转 意思是否有惯性
  controls.enableDamping = true;
  //动态阻尼系数 就是鼠标拖拽旋转灵敏度
  //controls.dampingFactor = 0.25;
  //是否可以缩放
  controls.enableZoom = true;
  //是否自动旋转
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.2;
  //设置相机距离原点的最远距离
  controls.minDistance  = 1;
  //设置相机距离原点的最远距离
  controls.maxDistance  = 200;
  //是否开启右键拖拽
  controls.enablePan = true;
}


sphere.rotation.y = 180;
sphere.rotation.z = 0;
let rotationBool = true
let step = 1
var animate = function () {
  requestAnimationFrame( animate );
  //每次调用模型的沿xy轴旋转0.01
  if (!rotationBool) {
    return
  }
  // sphere.rotation.y += 0.001;
  //使用渲染器把场景和相机都渲染出来？？加上这个转的特别快
  controls.update();
  renderer.render(scene, camera);
};


drawStars()
initControls()
animate()


document.body.onclick = function () {
  rotationBool = !rotationBool
}




//创建立方体的方法
var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xAFEEEE, transparent: true, opacity: Math.random() })
function addCube() {
  var radius = Math.random() * 0.3
  // var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize)
  var cubeGeometry = new THREE.SphereGeometry( radius, 32, 16 )

  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
  cube.castShadow = true

  cube.position.x = -100 + Math.round(Math.random() * 200)
  cube.position.y = -100 + Math.round(Math.random() * 200)
  cube.position.z = -100 + Math.round(Math.random() * 200)

  return cube
}


function drawStars(){
  for (var i = 0; i < numberOfObjects; i++) {
    scene.add(addCube())
  }
}