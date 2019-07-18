// class Move {
//     constructor(x, y) {
//         this.x = x
//         this.y = y
//     }

//     amove(id) {
//         let bool = false;
//         document.getElementById(id).addEventListener('mousedown', function (params) {
//             console.log({ x: params.x, y: params.y })
//             bool = true
//         })

//         document.getElementById(id).addEventListener('mouseover', function (params) {
//             if (bool) {
//                 console.log({ mx: params.x, my: params.y })
//                 this.style.marginLeft = params.x + 'px'
//             }
//         })
//     }
// }

// window.onload = function (params) {
//     const m = new Move();
//     m.amove('move');
//     document.getElementById('move').addEventListener('mouseup', function (params) {
//         bool = false;
//         document.getElementById('move').removeEventListener('mouseover', function (params) {
//             console.log('123')
//         })
//     })
// }


// window.onload = function (params) {

//     var obj = document.getElementById('move'), mouseDownX, mouseDownY, initX, initY, flag = false,time;
//     obj.onmousedown = function (e) {
//         //鼠标按下时的鼠标所在的X，Y坐标  
//         mouseDownX = e.pageX;
//         // mouseDownY = e.pageY;

//         //初始位置的X，Y 坐标  
//         initX = obj.offsetLeft;
//         // initY = obj.offsetTop;

//         //表示鼠标已按下  
//         flag = true;
//         e.preventDefault()
//     }
//     obj.onmousemove = function (e) {
//         // 确保鼠标已按下  
//         if (flag) {
//             var mouseMoveX = e.pageX, mouseMoveY = e.pageY;
//             this.style.left = parseInt(mouseMoveX) - parseInt(mouseDownX) + parseInt(initX) + "px";
//             console.log(mouseMoveX)
//             console.log(window.innerWidth)
//             // this.style.top = parseInt(mouseMoveY) - parseInt(mouseDownY) + parseInt(initY) + "px";
//         }
//         e.preventDefault()

//     }
//     obj.onmouseup = function (e) {
//         //标识已松开鼠标  
//         flag = false;
//         e.preventDefault()
//     }
// }


// export default Move