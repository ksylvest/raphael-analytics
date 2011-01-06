/*!
 * Raphael Analytics
 *
 * Copyright 2010 Kevin Sylvestre
 */
 
(function ($) {

  $.fn.analytics = function(options) {

    var settings = {
      data   : [], 
      text   : [],
      axis   : 'x',
      width  : 800,
      height : 400,
      point : {
        radius: 8,
        attr: { "fill": "#FFF", "stroke": "#369", "stroke-width": 4 }
      },
    };
    
    // Extend default settings with parameter options.
    if (options) $.extend(settings, options);
    
    // If data settings is a string, treat as DOM selector and load data.
    if (typeof(settings['data']) == 'string') {
      var $data = $(settings['data']); settings['data'] = [];
      $data.each(function () { settings['data'].push($(this).html()); });
    }
    
    // If text settings is a string, treat as DOM selector and load data.
    if (typeof(settings['text']) == 'string') {
      var $text = $(settings['text']); settings['text'] = [];
      $text.each(function () { settings['text'].push($(this).html()); });
    }
    
    // Calculate maximum and minimum points in data set.
    var maximum = Math.max.apply(Math, settings['data']);
    var minimum = Math.min.apply(Math, settings['data']);
    
    // Calculate range of points in data set.
    var range = maximum - minimum;
    
    // Calculate count.
    var count = Math.min(settings['text'].length, settings['data'].length);
    
    var r = Raphael('analytics', settings['width'], settings['height']);
    r.drawGrid(0, 0, 800, 400);
    
    // Iterate over minimum set.
    for (var i = 0; i < count; i++) {
      
      var text = settings['text'][i];
      var nextText = settings['text'][i + 1];
      var prevText = settings['text'][i + 1];
      
      var data = settings['data'][i];
      var nextData = settings['data'][i + 1];
      var prevData = settings['data'][i - 1];
      
      var normalizedData = data / range
      var normalizedNextData = (data - minimum) / range;
      var normalizedPrevData = (data - minimum) / range;
      
      var x;
      var y;
      
      var prevX;
      var prevY;
      var nextX;
      var nextY;
      
      if (settings['axis'] == 'x') {
        x = Math.round((settings['width'] / count) * i);
        y = Math.round(normalizedData * settings['height']);
      }
      
      if (settings['axis'] == 'y') {
        x = Math.round(normalizedData * settings['width']);
        y = Math.round((settings['height'] / count) * i);
      }
      
      var point = r.circle(x, y, settings['point']['radius']).attr(settings['point']['attr']);
      
      //              var Y0 = Math.round(height - bottomgutter - Y * data[i - 1]),
      //                  X0 = Math.round(leftgutter + X * (i - .5)),
      //                  Y2 = Math.round(height - bottomgutter - Y * data[i + 1]),
      //                  X2 = Math.round(leftgutter + X * (i + 1.5));
      //              var a = getAnchors(X0, Y0, x, y, X2, Y2);
      
    }
    
    function anchors(p1x, p1y, p2x, p2y, p3x, p3y) {

       var l1 = (p2x - p1x) / 2;
       var l2 = (p3x - p2x) / 2;

       var a = Math.atan((p2x - p1x) / Math.abs(p2y - p1y));
       var b = Math.atan((p3x - p2x) / Math.abs(p3y - p2y));

       if (p1y < p2y) a = Math.PI - a;
       if (p3y < p2y) b = Math.PI - b;

       var alpha = Math.PI / 2 - ((a + b) % (Math.PI * 2)) / 2;

       var dx1 = l1 * Math.sin(alpha + a);
       var dy1 = l1 * Math.cos(alpha + a);
       var dx2 = l2 * Math.sin(alpha + b);
       var dy2 = l2 * Math.cos(alpha + b);

       return {
         x1: p2x - dx1,
         y1: p2y + dy1,
         x2: p2x + dx2,
         y2: p2y + dy2,
       };

     }
    
    
    
    
    
    
    //      for (var i = 0, ii = labels.length; i < ii; i++) {
     //          var y = Math.round(height - bottomgutter - Y * data[i]),
     //              x = Math.round(leftgutter + X * (i + .5)),
     //              t = r.text(x, height - 6, labels[i]).attr(txt).toBack();
     //          if (!i) {
     //              p = ["M", x, y, "C", x, y];
     //              bgpp = ["M", leftgutter + X * .5, height - bottomgutter, "L", x, y, "C", x, y];
     //          }
     //          if (i && i < ii - 1) {
     //              var Y0 = Math.round(height - bottomgutter - Y * data[i - 1]),
     //                  X0 = Math.round(leftgutter + X * (i - .5)),
     //                  Y2 = Math.round(height - bottomgutter - Y * data[i + 1]),
     //                  X2 = Math.round(leftgutter + X * (i + 1.5));
     //              var a = getAnchors(X0, Y0, x, y, X2, Y2);
     //              p = p.concat([a.x1, a.y1, x, y, a.x2, a.y2]);
     //              bgpp = bgpp.concat([a.x1, a.y1, x, y, a.x2, a.y2]);
     //          }
     //          var dot = r.circle(x, y, 4).attr({fill: "#000", stroke: color, "stroke-width": 2});
     //          blanket.push(r.rect(leftgutter + X * i, 0, X, height - bottomgutter).attr({stroke: "none", fill: "#fff", opacity: 0}));
     //          var rect = blanket[blanket.length - 1];
     //          (function (x, y, data, lbl, dot) {
     //              var timer, i = 0;
     //              rect.hover(function () {
     //                  clearTimeout(leave_timer);
     //                  var side = "right";
     //                  if (x + frame.getBBox().width > width) {
     //                      side = "left";
     //                  }
     //                  var ppp = r.popup(x, y, label, side, 1);
     //                  frame.show().stop().animate({path: ppp.path}, 200 * is_label_visible);
     //                  label[0].attr({text: data + " hit" + (data == 1 ? "" : "s")}).show().stop().animateWith(frame, {translation: [ppp.dx, ppp.dy]}, 200 * is_label_visible);
     //                  label[1].attr({text: lbl + " September 2008"}).show().stop().animateWith(frame, {translation: [ppp.dx, ppp.dy]}, 200 * is_label_visible);
     //                  dot.attr("r", 6);
     //                  is_label_visible = true;
     //              }, function () {
     //                  dot.attr("r", 4);
     //                  leave_timer = setTimeout(function () {
     //                      frame.hide();
     //                      label[0].hide();
     //                      label[1].hide();
     //                      is_label_visible = false;
     //                  }, 1);
     //              });
     //          })(x, y, data[i], labels[i], dot);
     //      }
     //      p = p.concat([x, y, x, y]);
     //      bgpp = bgpp.concat([x, y, x, y, "L", x, height - bottomgutter, "z"]);
     //      path.attr({path: p});
     //      bgp.attr({path: bgpp});
     //      frame.toFront();
     //      label[0].toFront();
     //      label[1].toFront();
     //      blanket.toFront();
     //  };
    
    
    

  };

}) (jQuery);

Raphael.fn.draw

Raphael.fn.drawGrid = function(x, y, w, h) {
  var hv = 8;
  var wv = 8;
  var path = [];
  var color = "#EEEEEE"
  
  for (var i = 1; i < hv; i++) {
    path = path.concat(["M", Math.round(x) + 0.5, Math.round(y + i * h / hv) + 0.5]);
    path = path.concat(["H", Math.round(x + w) + 0.5]);
  }
  
  for (var i = 1; i < wv; i++) {
    path = path.concat(["M", Math.round(x + i * w / wv) + 0.5, Math.round(y) + 0.5]);
    path = path.concat(["V", Math.round(y + h) + 0.5]);
  }
  
  return this.path(path.join(",")).attr({stroke: color});
}

 // 
 //  window.onload = function () {


 //      // Draw
 //      var width = 800,
 //          height = 250,
 //          leftgutter = 30,
 //          bottomgutter = 20,
 //          topgutter = 20,
 //          colorhue = .6 || Math.random(),
 //          color = "hsb(" + [colorhue, .5, 1] + ")",
 //          r = Raphael("holder", width, height),
 //          txt = {font: '12px Helvetica, Arial', fill: "#fff"},
 //          txt1 = {font: '10px Helvetica, Arial', fill: "#fff"},
 //          txt2 = {font: '12px Helvetica, Arial', fill: "#000"},
 //          X = (width - leftgutter) / labels.length,
 //          max = Math.max.apply(Math, data),
 //          Y = (height - bottomgutter - topgutter) / max;
 //      r.drawGrid(leftgutter + X * .5 + .5, topgutter + .5, width - leftgutter - X, height - topgutter - bottomgutter, 10, 10, "#333");
 //      var path = r.path().attr({stroke: color, "stroke-width": 4, "stroke-linejoin": "round"}),
 //          bgp = r.path().attr({stroke: "none", opacity: .3, fill: color}),
 //          label = r.set(),
 //          is_label_visible = false,
 //          leave_timer,
 //          blanket = r.set();
 //      label.push(r.text(60, 12, "24 hits").attr(txt));
 //      label.push(r.text(60, 27, "22 September 2008").attr(txt1).attr({fill: color}));
 //      label.hide();
 //      var frame = r.popup(100, 100, label, "right").attr({fill: "#000", stroke: "#666", "stroke-width": 2, "fill-opacity": .7}).hide();
 // 
 //      var p, bgpp;
 //      for (var i = 0, ii = labels.length; i < ii; i++) {
 //          var y = Math.round(height - bottomgutter - Y * data[i]),
 //              x = Math.round(leftgutter + X * (i + .5)),
 //              t = r.text(x, height - 6, labels[i]).attr(txt).toBack();
 //          if (!i) {
 //              p = ["M", x, y, "C", x, y];
 //              bgpp = ["M", leftgutter + X * .5, height - bottomgutter, "L", x, y, "C", x, y];
 //          }
 //          if (i && i < ii - 1) {
 //              var Y0 = Math.round(height - bottomgutter - Y * data[i - 1]),
 //                  X0 = Math.round(leftgutter + X * (i - .5)),
 //                  Y2 = Math.round(height - bottomgutter - Y * data[i + 1]),
 //                  X2 = Math.round(leftgutter + X * (i + 1.5));
 //              var a = getAnchors(X0, Y0, x, y, X2, Y2);
 //              p = p.concat([a.x1, a.y1, x, y, a.x2, a.y2]);
 //              bgpp = bgpp.concat([a.x1, a.y1, x, y, a.x2, a.y2]);
 //          }
 //          var dot = r.circle(x, y, 4).attr({fill: "#000", stroke: color, "stroke-width": 2});
 //          blanket.push(r.rect(leftgutter + X * i, 0, X, height - bottomgutter).attr({stroke: "none", fill: "#fff", opacity: 0}));
 //          var rect = blanket[blanket.length - 1];
 //          (function (x, y, data, lbl, dot) {
 //              var timer, i = 0;
 //              rect.hover(function () {
 //                  clearTimeout(leave_timer);
 //                  var side = "right";
 //                  if (x + frame.getBBox().width > width) {
 //                      side = "left";
 //                  }
 //                  var ppp = r.popup(x, y, label, side, 1);
 //                  frame.show().stop().animate({path: ppp.path}, 200 * is_label_visible);
 //                  label[0].attr({text: data + " hit" + (data == 1 ? "" : "s")}).show().stop().animateWith(frame, {translation: [ppp.dx, ppp.dy]}, 200 * is_label_visible);
 //                  label[1].attr({text: lbl + " September 2008"}).show().stop().animateWith(frame, {translation: [ppp.dx, ppp.dy]}, 200 * is_label_visible);
 //                  dot.attr("r", 6);
 //                  is_label_visible = true;
 //              }, function () {
 //                  dot.attr("r", 4);
 //                  leave_timer = setTimeout(function () {
 //                      frame.hide();
 //                      label[0].hide();
 //                      label[1].hide();
 //                      is_label_visible = false;
 //                  }, 1);
 //              });
 //          })(x, y, data[i], labels[i], dot);
 //      }
 //      p = p.concat([x, y, x, y]);
 //      bgpp = bgpp.concat([x, y, x, y, "L", x, height - bottomgutter, "z"]);
 //      path.attr({path: p});
 //      bgp.attr({path: bgpp});
 //      frame.toFront();
 //      label[0].toFront();
 //      label[1].toFront();
 //      blanket.toFront();
 //  };