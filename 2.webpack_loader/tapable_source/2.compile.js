(function anonymous(name, age, _callback) {
  var _x = this._x; //header

  var _counter = 3;//计时器3 这就是钩子函数的数量
  var _done = () => {//调用done则意味着全部完成了
    _callback();
  };

  var _fn0 = _x[0];//先出第一个钩子函数
  _fn0(name, age, (_err0) => {
    if (--_counter === 0) _done();
  });

  var _fn1 = _x[1];
  _fn1(name, age, (_err1) => {
    if (--_counter === 0) _done();
  });

  var _fn2 = _x[2];
  _fn2(name, age, (_err2) => {
    if (--_counter === 0) _done();
  });
});
