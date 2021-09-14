// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')

//设置场景的大小
var width = 400;
var height = 300;
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


//盒子模型（BoxGeometry），这是一个包含立方体所有顶点和填充面的对象。
// var geometry = new THREE.BoxGeometry( 2, 2, 2 );
// 球形
const geometry = new THREE.SphereGeometry( 50, 32, 16 );
//使用网孔基础材料（MeshBasicMaterial）进行着色器，这里只绘制了一个绿色
// var material = new THREE.MeshLambertMaterial( { color: 0xFFF000 } );
// MeshLambertMaterial 这种材质可以用来创建暗淡的并不光亮的表面

//首先，获取到纹理
var map = THREE.ImageUtils.loadTexture("src/assets/moon6.png");

//然后创建一个phong材质来处理着色，并传递给纹理映射
var material = new THREE.MeshPhongMaterial({map: map});

//使用网孔(Mesh)来承载几何模型
var cube = new THREE.Mesh( geometry, material );
//将模型添加到场景当中
scene.add( cube );


// 线
// const lineMaterial = new THREE.LineBasicMaterial( { color: 0x0000ff } );
// const points = [];
// points.push( new THREE.Vector3( - 10, 0, 0 ) );
// points.push( new THREE.Vector3( 0, 10, 0 ) );
// points.push( new THREE.Vector3( 10, 0, 0 ) );
// const lineGeometry = new THREE.BufferGeometry().setFromPoints( points );
// const line = new THREE.Line( lineGeometry, lineMaterial );
// scene.add(line);

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


// //设置一个动画函数
// var animate = function () {
//     //一秒钟调用60次，也就是以每秒60帧的频率来绘制场景。
//     requestAnimationFrame( animate );

//     //console.log(cube.rotation);
//     //每次调用模型的沿xy轴旋转0.01
//     cube.rotation.x += 0.01;
//     cube.rotation.y += 0.01;
//     //使用渲染器把场景和相机都渲染出来
//     renderer.render(scene, camera);
// };

// animate();
cube.rotation.y = 180;
cube.rotation.z = 0;

let step = 1
var animate = function () {
  //一秒钟调用60次，也就是以每秒60帧的频率来绘制场景。
  requestAnimationFrame( animate );
  
  // if ( pointLight.position.x > 180) {
  //   step = 1
  // } else if ( pointLight.position.x < -180) {
  //   step = -1
  // }
  // pointLight.position.x -= step;
  
  //每次调用模型的沿xy轴旋转0.01
  cube.rotation.y += 0.005;
  // cube.rotation.y += 0.005;
  //使用渲染器把场景和相机都渲染出来
  renderer.render(scene, camera);
};

animate();



//  //设置场景的大小
//  var width = 400;
//  var height = 300;

//  //设置相机的一些参数。
//  var view_angle = 45;
//  var aspect = width / height;
//  var near = 0.1;
//  var far = 10000;

//  //设置容器
//  var $container = document.querySelector('#container')

//  //新建一个WebGL 渲染，以及相机
//  var renderer = new THREE.WebGLRenderer();
//  var camera =
//      new THREE.PerspectiveCamera(
//      view_angle, aspect, near, far
//      );
//  var scene = new THREE.Scene();

//  //把相机添加到场景里面
//  scene.add(camera);

//  camera.position.z = 300;

//  renderer.setSize(width, height);

//  //附加DOM元素
//  $container.append(renderer.domElement);

//  //设置球体的值
//  var radius = 50, segemnt = 16, rings = 16;

//  var sphereMaterial = new THREE.MeshLambertMaterial({ color: 0xFFF000 });

//  var sphere = new THREE.Mesh(
//      new THREE.SphereGeometry(radius,segemnt,rings),
//      sphereMaterial
//      );

//  sphere.geometry.verticesNeedUpdate = true;
//  sphere.geometry.normalsNeedUpdate = true;

//  scene.add(sphere);

//  var pointLight = new THREE.PointLight(0xFFFFFF);

//  pointLight.position.x = 0;
//  pointLight.position.y = 50;
//  pointLight.position.z = 150;

//  scene.add(pointLight);

  
//  //画图
// //  renderer.render(scene, camera);

// let step = 1
//  var animate = function () {
//     //一秒钟调用60次，也就是以每秒60帧的频率来绘制场景。
//     requestAnimationFrame( animate );
    
//     if ( pointLight.position.x > 180) {
//       step = 1
//     } else if ( pointLight.position.x < -180) {
//       step = -1
//     }
//     pointLight.position.x -= step;
//     //console.log(cube.rotation);
//     //每次调用模型的沿xy轴旋转0.01
//     // cube.rotation.x += 0.01;
//     // cube.rotation.y += 0.01;
//     //使用渲染器把场景和相机都渲染出来
//     renderer.render(scene, camera);
// };

// animate();