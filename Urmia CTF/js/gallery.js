/*--------------------
Vars
--------------------*/
const $gallery = document.querySelector('.gallery');
const $items = document.querySelectorAll('.gallery--item');
const $images = document.querySelectorAll('.gallery--item img');
let galleryWidth = $gallery.clientWidth;
let itemWidth = $items[0].clientWidth;
let wrapWidth = $items.length * itemWidth;

let scrollSpeed = 0;
let oldScrollY = 0;
let scrollY = 0;
let y = 0;


/*--------------------
Lerp
--------------------*/
const lerp = (v0, v1, t) => {
  return v0 * (1 - t) + v1 * t;
};


/*--------------------
Dispose
--------------------*/
const dispose = scroll => {
  gsap.set($items, {
    x: i => {
      return i * itemWidth + scroll;
    },
    modifiers: {
      x: (x, target) => {
        const s = gsap.utils.wrap(-itemWidth, wrapWidth - itemWidth, parseInt(x));
        return `${s}px`;
      } } });


};
dispose(0);


/*--------------------
Wheel
--------------------*/
const handleMouseWheel = e => {
  scrollY -= e.deltaY * 0.9;
};


/*--------------------
Touch
--------------------*/
let touchStart = 0;
let touchX = 0;
let isDragging = false;
const handleTouchStart = e => {
  touchStart = e.clientX || e.touches[0].clientX;
  isDragging = true;
  $gallery.classList.add('is-dragging');
};
const handleTouchMove = e => {
  if (!isDragging) return;
  touchX = e.clientX || e.touches[0].clientX;
  scrollY += (touchX - touchStart) * 2.5;
  touchStart = touchX;
};
const handleTouchEnd = () => {
  isDragging = false;
  $gallery.classList.remove('is-dragging');
};


/*--------------------
Listeners
--------------------*/
$gallery.addEventListener('mousewheel', handleMouseWheel);

$gallery.addEventListener('touchstart', handleTouchStart);
$gallery.addEventListener('touchmove', handleTouchMove);
$gallery.addEventListener('touchend', handleTouchEnd);

$gallery.addEventListener('mousedown', handleTouchStart);
$gallery.addEventListener('mousemove', handleTouchMove);
$gallery.addEventListener('mouseleave', handleTouchEnd);
$gallery.addEventListener('mouseup', handleTouchEnd);

$gallery.addEventListener('selectstart', () => {return false;});


/*--------------------
Resize
--------------------*/
window.addEventListener('resize', () => {
  galleryWidth = $gallery.clientWidth;
  itemWidth = $items[0].clientWidth;
  wrapWidth = $items.length * itemWidth;
});


/*--------------------
Render
--------------------*/
const render = () => {
  requestAnimationFrame(render);
  y = lerp(y, scrollY, .1);
  dispose(y);

  scrollSpeed = y - oldScrollY;
  oldScrollY = y;

  gsap.to($items, {
    skewX: -scrollSpeed * .2,
    rotate: scrollSpeed * .01,
    scale: 1 - Math.min(100, Math.abs(scrollSpeed)) * 0.003 });

};
render();