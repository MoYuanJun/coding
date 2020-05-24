export default () => {
  var canvas = document.getElementById('textparticle'),
    ctx = canvas.getContext('2d');

  var cw = canvas.width = window.innerWidth;
  var ch = canvas.height = window.innerHeight;

  var keyword = "Would love to hear back !!";
  var radius = 6400;
  var drag = 0.92;
  var ease = 0.2;
  var density = 1;
  var offset = 5;
  var timeout = 30;
  var pixels;
  var particles = [];

  var mx = 0, my = 0;

  //ctx.fillStyle = "#1c1d25";
  //ctx.fillRect(0,0,canvas.width,canvas.height);

  ctx.font = "90px 'Jockey One'";
  //ctx.fillStyle = "#cccccc";
  //Fill the keyword text onto the canvas.
  ctx.fillText(keyword, (cw / 2) - (Math.round(ctx.measureText(keyword).width / 2)), ~~(ch / 2));



  canvas.addEventListener('mousemove', function (e) {

    mx = e.clientX - canvas.offsetLeft;
    my = e.clientY - canvas.offsetTop;

  });

  var Particle = function (x, y) {
    this.hx = ~~(x - offset * Math.random());
    this.hy = ~~(y - offset * Math.random());
    this.cx = ~~(cw * Math.random());
    this.cy = ~~(ch * Math.random());
    this.vx = Math.random() * 10 - 5;
    this.vy = Math.random() * 10 - 5;
  }


  Particle.prototype.update = function () {
    var dx = this.cx - mx;
    var dy = this.cy - my;
    var ds = (dx * dx) + (dy * dy);
    var aradius = Math.min(radius / ds, radius);
    var theta = Math.atan2(dy, dx);

    var hdx = this.hx - this.cx;
    var hdy = this.hy - this.cy;
    var hds = Math.sqrt((hdx * hdx) + (hdy * hdy));
    var hf = (hds * 0.01);
    var htheta = Math.atan2(hdy, hdx);



    this.vx += aradius * Math.cos(theta) + hf * Math.cos(htheta);
    this.vy += aradius * Math.sin(theta) + hf * Math.sin(htheta);

    this.vx *= drag;
    this.vy *= drag;

    this.cx += this.vx;
    this.cy += this.vy;


		/*this.cx = this.cx + (this.vx *= drag) + ( this.hx - this.cx ) * ease;
		this.cy = this.cy + (this.vy *= drag) + ( this.hy - this.cy ) * ease;*/
  }

  var draw = function () {
    let a = ctx.createImageData(cw, ch)
    let b = a.data


    for (var i = 0; i < particles.length; i++) {
      particles[i].update();
    }

    for (var j = 0; j < particles.length; j++) {
      let p = particles[j];
      let n = (~~p.cx + (~~p.cy * cw))
      b[n * 4] = b[n + 1] = b[n + 2] = 220, b[n + 3] = 255;

    }

    //a.data = b;



    //ctx.fillStyle = "black";
    //ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.putImageData(a, 0, 0);

    //console.log(mx,my)
    setTimeout(function () {
      requestAnimationFrame(draw);
    }, timeout);

  }


  var init = function () {
    pixels = ctx.getImageData(0, 0, cw, ch).data;

    for (var i = 0; i < ch; i = i + density) {


      for (var j = 0; j < cw; j = j + density) {
        var index = (j + i * cw) * 4;

        if (pixels[index + 3] > 128) {
          //acts ad a filter for adding new particles.
          //particles.push( new Particle(j,i) );
          if (index >= particles.length) {
            particles.push(new Particle(j, i));
          }
          else {
            particles[index].hx = j;
            particles[index].hy = i;
          }
        }
      }
    }

  }


  init();
  console.log(particles.length)
  draw();

}
