/*! rot.js subset: RNG, Map.Digger, FOV.PreciseShadowcasting, Path.AStar (github.com/ondras/rot.js @ 46782e2) by Ondrej Zara, BSD-3-Clause, see vendor/rot/license.txt.
 * Bundled once for Pulse as a classic script. Local copy: nothing is loaded from the internet. */
(() => {
  // ../vendor_src/rot/lib/rng.js
  var FRAC = 0.00000000023283064365386963;

  class RNG {
    constructor() {
      this._seed = 0;
      this._s0 = 0;
      this._s1 = 0;
      this._s2 = 0;
      this._c = 0;
    }
    getSeed() {
      return this._seed;
    }
    setSeed(seed) {
      seed = seed < 1 ? 1 / seed : seed;
      this._seed = seed;
      this._s0 = (seed >>> 0) * FRAC;
      seed = seed * 69069 + 1 >>> 0;
      this._s1 = seed * FRAC;
      seed = seed * 69069 + 1 >>> 0;
      this._s2 = seed * FRAC;
      this._c = 1;
      return this;
    }
    getUniform() {
      let t = 2091639 * this._s0 + this._c * FRAC;
      this._s0 = this._s1;
      this._s1 = this._s2;
      this._c = t | 0;
      this._s2 = t - this._c;
      return this._s2;
    }
    getUniformInt(lowerBound, upperBound) {
      let max = Math.max(lowerBound, upperBound);
      let min = Math.min(lowerBound, upperBound);
      return Math.floor(this.getUniform() * (max - min + 1)) + min;
    }
    getNormal(mean = 0, stddev = 1) {
      let u, v, r;
      do {
        u = 2 * this.getUniform() - 1;
        v = 2 * this.getUniform() - 1;
        r = u * u + v * v;
      } while (r > 1 || r == 0);
      let gauss = u * Math.sqrt(-2 * Math.log(r) / r);
      return mean + gauss * stddev;
    }
    getPercentage() {
      return 1 + Math.floor(this.getUniform() * 100);
    }
    getItem(array) {
      if (!array.length) {
        return null;
      }
      return array[Math.floor(this.getUniform() * array.length)];
    }
    shuffle(array) {
      let result = [];
      let clone = array.slice();
      while (clone.length) {
        let index = clone.indexOf(this.getItem(clone));
        result.push(clone.splice(index, 1)[0]);
      }
      return result;
    }
    getWeightedValue(data) {
      let total = 0;
      for (let id in data) {
        total += data[id];
      }
      let random = this.getUniform() * total;
      let id, part = 0;
      for (id in data) {
        part += data[id];
        if (random < part) {
          return id;
        }
      }
      return id;
    }
    getState() {
      return [this._s0, this._s1, this._s2, this._c];
    }
    setState(state) {
      this._s0 = state[0];
      this._s1 = state[1];
      this._s2 = state[2];
      this._c = state[3];
      return this;
    }
    clone() {
      let clone = new RNG;
      return clone.setState(this.getState());
    }
  }
  var rng_default = new RNG().setSeed(Date.now());

  // ../vendor_src/rot/lib/constants.js
  var DEFAULT_WIDTH = 80;
  var DEFAULT_HEIGHT = 25;
  var DIRS = {
    4: [[0, -1], [1, 0], [0, 1], [-1, 0]],
    8: [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]],
    6: [[-1, -1], [1, -1], [2, 0], [1, 1], [-1, 1], [-2, 0]]
  };

  // ../vendor_src/rot/lib/map/map.js
  class Map {
    constructor(width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT) {
      this._width = width;
      this._height = height;
    }
    _fillMap(value) {
      let map = [];
      for (let i = 0;i < this._width; i++) {
        map.push([]);
        for (let j = 0;j < this._height; j++) {
          map[i].push(value);
        }
      }
      return map;
    }
  }

  // ../vendor_src/rot/lib/map/dungeon.js
  class Dungeon extends Map {
    constructor(width, height) {
      super(width, height);
      this._rooms = [];
      this._corridors = [];
    }
    getRooms() {
      return this._rooms;
    }
    getCorridors() {
      return this._corridors;
    }
  }

  // ../vendor_src/rot/lib/map/features.js
  class Feature {
  }

  class Room extends Feature {
    constructor(x1, y1, x2, y2, doorX, doorY) {
      super();
      this._x1 = x1;
      this._y1 = y1;
      this._x2 = x2;
      this._y2 = y2;
      this._doors = {};
      if (doorX !== undefined && doorY !== undefined) {
        this.addDoor(doorX, doorY);
      }
    }
    static createRandomAt(x, y, dx, dy, options) {
      let min = options.roomWidth[0];
      let max = options.roomWidth[1];
      let width = rng_default.getUniformInt(min, max);
      min = options.roomHeight[0];
      max = options.roomHeight[1];
      let height = rng_default.getUniformInt(min, max);
      if (dx == 1) {
        let y2 = y - Math.floor(rng_default.getUniform() * height);
        return new this(x + 1, y2, x + width, y2 + height - 1, x, y);
      }
      if (dx == -1) {
        let y2 = y - Math.floor(rng_default.getUniform() * height);
        return new this(x - width, y2, x - 1, y2 + height - 1, x, y);
      }
      if (dy == 1) {
        let x2 = x - Math.floor(rng_default.getUniform() * width);
        return new this(x2, y + 1, x2 + width - 1, y + height, x, y);
      }
      if (dy == -1) {
        let x2 = x - Math.floor(rng_default.getUniform() * width);
        return new this(x2, y - height, x2 + width - 1, y - 1, x, y);
      }
      throw new Error("dx or dy must be 1 or -1");
    }
    static createRandomCenter(cx, cy, options) {
      let min = options.roomWidth[0];
      let max = options.roomWidth[1];
      let width = rng_default.getUniformInt(min, max);
      min = options.roomHeight[0];
      max = options.roomHeight[1];
      let height = rng_default.getUniformInt(min, max);
      let x1 = cx - Math.floor(rng_default.getUniform() * width);
      let y1 = cy - Math.floor(rng_default.getUniform() * height);
      let x2 = x1 + width - 1;
      let y2 = y1 + height - 1;
      return new this(x1, y1, x2, y2);
    }
    static createRandom(availWidth, availHeight, options) {
      let min = options.roomWidth[0];
      let max = options.roomWidth[1];
      let width = rng_default.getUniformInt(min, max);
      min = options.roomHeight[0];
      max = options.roomHeight[1];
      let height = rng_default.getUniformInt(min, max);
      let left = availWidth - width - 1;
      let top = availHeight - height - 1;
      let x1 = 1 + Math.floor(rng_default.getUniform() * left);
      let y1 = 1 + Math.floor(rng_default.getUniform() * top);
      let x2 = x1 + width - 1;
      let y2 = y1 + height - 1;
      return new this(x1, y1, x2, y2);
    }
    addDoor(x, y) {
      this._doors[x + "," + y] = 1;
      return this;
    }
    getDoors(cb) {
      for (let key in this._doors) {
        let parts = key.split(",");
        cb(parseInt(parts[0]), parseInt(parts[1]));
      }
      return this;
    }
    clearDoors() {
      this._doors = {};
      return this;
    }
    addDoors(isWallCallback) {
      let left = this._x1 - 1;
      let right = this._x2 + 1;
      let top = this._y1 - 1;
      let bottom = this._y2 + 1;
      for (let x = left;x <= right; x++) {
        for (let y = top;y <= bottom; y++) {
          if (x != left && x != right && y != top && y != bottom) {
            continue;
          }
          if (isWallCallback(x, y)) {
            continue;
          }
          this.addDoor(x, y);
        }
      }
      return this;
    }
    debug() {
      console.log("room", this._x1, this._y1, this._x2, this._y2);
    }
    isValid(isWallCallback, canBeDugCallback) {
      let left = this._x1 - 1;
      let right = this._x2 + 1;
      let top = this._y1 - 1;
      let bottom = this._y2 + 1;
      for (let x = left;x <= right; x++) {
        for (let y = top;y <= bottom; y++) {
          if (x == left || x == right || y == top || y == bottom) {
            if (!isWallCallback(x, y)) {
              return false;
            }
          } else {
            if (!canBeDugCallback(x, y)) {
              return false;
            }
          }
        }
      }
      return true;
    }
    create(digCallback) {
      let left = this._x1 - 1;
      let right = this._x2 + 1;
      let top = this._y1 - 1;
      let bottom = this._y2 + 1;
      let value = 0;
      for (let x = left;x <= right; x++) {
        for (let y = top;y <= bottom; y++) {
          if (x + "," + y in this._doors) {
            value = 2;
          } else if (x == left || x == right || y == top || y == bottom) {
            value = 1;
          } else {
            value = 0;
          }
          digCallback(x, y, value);
        }
      }
    }
    getCenter() {
      return [Math.round((this._x1 + this._x2) / 2), Math.round((this._y1 + this._y2) / 2)];
    }
    getLeft() {
      return this._x1;
    }
    getRight() {
      return this._x2;
    }
    getTop() {
      return this._y1;
    }
    getBottom() {
      return this._y2;
    }
  }

  class Corridor extends Feature {
    constructor(startX, startY, endX, endY) {
      super();
      this._startX = startX;
      this._startY = startY;
      this._endX = endX;
      this._endY = endY;
      this._endsWithAWall = true;
    }
    static createRandomAt(x, y, dx, dy, options) {
      let min = options.corridorLength[0];
      let max = options.corridorLength[1];
      let length = rng_default.getUniformInt(min, max);
      return new this(x, y, x + dx * length, y + dy * length);
    }
    debug() {
      console.log("corridor", this._startX, this._startY, this._endX, this._endY);
    }
    isValid(isWallCallback, canBeDugCallback) {
      let sx = this._startX;
      let sy = this._startY;
      let dx = this._endX - sx;
      let dy = this._endY - sy;
      let length = 1 + Math.max(Math.abs(dx), Math.abs(dy));
      if (dx) {
        dx = dx / Math.abs(dx);
      }
      if (dy) {
        dy = dy / Math.abs(dy);
      }
      let nx = dy;
      let ny = -dx;
      let ok = true;
      for (let i = 0;i < length; i++) {
        let x = sx + i * dx;
        let y = sy + i * dy;
        if (!canBeDugCallback(x, y)) {
          ok = false;
        }
        if (!isWallCallback(x + nx, y + ny)) {
          ok = false;
        }
        if (!isWallCallback(x - nx, y - ny)) {
          ok = false;
        }
        if (!ok) {
          length = i;
          this._endX = x - dx;
          this._endY = y - dy;
          break;
        }
      }
      if (length == 0) {
        return false;
      }
      if (length == 1 && isWallCallback(this._endX + dx, this._endY + dy)) {
        return false;
      }
      let firstCornerBad = !isWallCallback(this._endX + dx + nx, this._endY + dy + ny);
      let secondCornerBad = !isWallCallback(this._endX + dx - nx, this._endY + dy - ny);
      this._endsWithAWall = isWallCallback(this._endX + dx, this._endY + dy);
      if ((firstCornerBad || secondCornerBad) && this._endsWithAWall) {
        return false;
      }
      return true;
    }
    create(digCallback) {
      let sx = this._startX;
      let sy = this._startY;
      let dx = this._endX - sx;
      let dy = this._endY - sy;
      let length = 1 + Math.max(Math.abs(dx), Math.abs(dy));
      if (dx) {
        dx = dx / Math.abs(dx);
      }
      if (dy) {
        dy = dy / Math.abs(dy);
      }
      for (let i = 0;i < length; i++) {
        let x = sx + i * dx;
        let y = sy + i * dy;
        digCallback(x, y, 0);
      }
      return true;
    }
    createPriorityWalls(priorityWallCallback) {
      if (!this._endsWithAWall) {
        return;
      }
      let sx = this._startX;
      let sy = this._startY;
      let dx = this._endX - sx;
      let dy = this._endY - sy;
      if (dx) {
        dx = dx / Math.abs(dx);
      }
      if (dy) {
        dy = dy / Math.abs(dy);
      }
      let nx = dy;
      let ny = -dx;
      priorityWallCallback(this._endX + dx, this._endY + dy);
      priorityWallCallback(this._endX + nx, this._endY + ny);
      priorityWallCallback(this._endX - nx, this._endY - ny);
    }
  }

  // ../vendor_src/rot/lib/map/digger.js
  var FEATURES = {
    room: Room,
    corridor: Corridor
  };

  class Digger extends Dungeon {
    constructor(width, height, options = {}) {
      super(width, height);
      this._options = Object.assign({
        roomWidth: [3, 9],
        roomHeight: [3, 5],
        corridorLength: [3, 10],
        dugPercentage: 0.2,
        timeLimit: 1000
      }, options);
      this._features = {
        room: 4,
        corridor: 4
      };
      this._map = [];
      this._featureAttempts = 20;
      this._walls = {};
      this._dug = 0;
      this._digCallback = this._digCallback.bind(this);
      this._canBeDugCallback = this._canBeDugCallback.bind(this);
      this._isWallCallback = this._isWallCallback.bind(this);
      this._priorityWallCallback = this._priorityWallCallback.bind(this);
    }
    create(callback) {
      this._rooms = [];
      this._corridors = [];
      this._map = this._fillMap(1);
      this._walls = {};
      this._dug = 0;
      let area = (this._width - 2) * (this._height - 2);
      this._firstRoom();
      let t1 = Date.now();
      let priorityWalls;
      do {
        priorityWalls = 0;
        let t2 = Date.now();
        if (t2 - t1 > this._options.timeLimit) {
          break;
        }
        let wall = this._findWall();
        if (!wall) {
          break;
        }
        let parts = wall.split(",");
        let x = parseInt(parts[0]);
        let y = parseInt(parts[1]);
        let dir = this._getDiggingDirection(x, y);
        if (!dir) {
          continue;
        }
        let featureAttempts = 0;
        do {
          featureAttempts++;
          if (this._tryFeature(x, y, dir[0], dir[1])) {
            this._removeSurroundingWalls(x, y);
            this._removeSurroundingWalls(x - dir[0], y - dir[1]);
            break;
          }
        } while (featureAttempts < this._featureAttempts);
        for (let id in this._walls) {
          if (this._walls[id] > 1) {
            priorityWalls++;
          }
        }
      } while (this._dug / area < this._options.dugPercentage || priorityWalls);
      this._addDoors();
      if (callback) {
        for (let i = 0;i < this._width; i++) {
          for (let j = 0;j < this._height; j++) {
            callback(i, j, this._map[i][j]);
          }
        }
      }
      this._walls = {};
      this._map = [];
      return this;
    }
    _digCallback(x, y, value) {
      if (value == 0 || value == 2) {
        this._map[x][y] = 0;
        this._dug++;
      } else {
        this._walls[x + "," + y] = 1;
      }
    }
    _isWallCallback(x, y) {
      if (x < 0 || y < 0 || x >= this._width || y >= this._height) {
        return false;
      }
      return this._map[x][y] == 1;
    }
    _canBeDugCallback(x, y) {
      if (x < 1 || y < 1 || x + 1 >= this._width || y + 1 >= this._height) {
        return false;
      }
      return this._map[x][y] == 1;
    }
    _priorityWallCallback(x, y) {
      this._walls[x + "," + y] = 2;
    }
    _firstRoom() {
      let cx = Math.floor(this._width / 2);
      let cy = Math.floor(this._height / 2);
      let room = Room.createRandomCenter(cx, cy, this._options);
      this._rooms.push(room);
      room.create(this._digCallback);
    }
    _findWall() {
      let prio1 = [];
      let prio2 = [];
      for (let id in this._walls) {
        let prio = this._walls[id];
        if (prio == 2) {
          prio2.push(id);
        } else {
          prio1.push(id);
        }
      }
      let arr = prio2.length ? prio2 : prio1;
      if (!arr.length) {
        return null;
      }
      let id = rng_default.getItem(arr.sort());
      delete this._walls[id];
      return id;
    }
    _tryFeature(x, y, dx, dy) {
      let featureName = rng_default.getWeightedValue(this._features);
      let ctor = FEATURES[featureName];
      let feature = ctor.createRandomAt(x, y, dx, dy, this._options);
      if (!feature.isValid(this._isWallCallback, this._canBeDugCallback)) {
        return false;
      }
      feature.create(this._digCallback);
      if (feature instanceof Room) {
        this._rooms.push(feature);
      }
      if (feature instanceof Corridor) {
        feature.createPriorityWalls(this._priorityWallCallback);
        this._corridors.push(feature);
      }
      return true;
    }
    _removeSurroundingWalls(cx, cy) {
      let deltas = DIRS[4];
      for (let i = 0;i < deltas.length; i++) {
        let delta = deltas[i];
        let x = cx + delta[0];
        let y = cy + delta[1];
        delete this._walls[x + "," + y];
        x = cx + 2 * delta[0];
        y = cy + 2 * delta[1];
        delete this._walls[x + "," + y];
      }
    }
    _getDiggingDirection(cx, cy) {
      if (cx <= 0 || cy <= 0 || cx >= this._width - 1 || cy >= this._height - 1) {
        return null;
      }
      let result = null;
      let deltas = DIRS[4];
      for (let i = 0;i < deltas.length; i++) {
        let delta = deltas[i];
        let x = cx + delta[0];
        let y = cy + delta[1];
        if (!this._map[x][y]) {
          if (result) {
            return null;
          }
          result = delta;
        }
      }
      if (!result) {
        return null;
      }
      return [-result[0], -result[1]];
    }
    _addDoors() {
      let data = this._map;
      function isWallCallback(x, y) {
        return data[x][y] == 1;
      }
      for (let i = 0;i < this._rooms.length; i++) {
        let room = this._rooms[i];
        room.clearDoors();
        room.addDoors(isWallCallback);
      }
    }
  }

  // ../vendor_src/rot/lib/fov/fov.js
  class FOV {
    constructor(lightPassesCallback, options = {}) {
      this._lightPasses = lightPassesCallback;
      this._options = Object.assign({ topology: 8 }, options);
    }
    _getCircle(cx, cy, r) {
      let result = [];
      let dirs, countFactor, startOffset;
      switch (this._options.topology) {
        case 4:
          countFactor = 1;
          startOffset = [0, 1];
          dirs = [
            DIRS[8][7],
            DIRS[8][1],
            DIRS[8][3],
            DIRS[8][5]
          ];
          break;
        case 6:
          dirs = DIRS[6];
          countFactor = 1;
          startOffset = [-1, 1];
          break;
        case 8:
          dirs = DIRS[4];
          countFactor = 2;
          startOffset = [-1, 1];
          break;
        default:
          throw new Error("Incorrect topology for FOV computation");
          break;
      }
      let x = cx + startOffset[0] * r;
      let y = cy + startOffset[1] * r;
      for (let i = 0;i < dirs.length; i++) {
        for (let j = 0;j < r * countFactor; j++) {
          result.push([x, y]);
          x += dirs[i][0];
          y += dirs[i][1];
        }
      }
      return result;
    }
  }

  // ../vendor_src/rot/lib/fov/precise-shadowcasting.js
  class PreciseShadowcasting extends FOV {
    compute(x, y, R, callback) {
      callback(x, y, 0, 1);
      if (!this._lightPasses(x, y)) {
        return;
      }
      let SHADOWS = [];
      let cx, cy, blocks, A1, A2, visibility;
      for (let r = 1;r <= R; r++) {
        let neighbors = this._getCircle(x, y, r);
        let neighborCount = neighbors.length;
        for (let i = 0;i < neighborCount; i++) {
          cx = neighbors[i][0];
          cy = neighbors[i][1];
          A1 = [i ? 2 * i - 1 : 2 * neighborCount - 1, 2 * neighborCount];
          A2 = [2 * i + 1, 2 * neighborCount];
          blocks = !this._lightPasses(cx, cy);
          visibility = this._checkVisibility(A1, A2, blocks, SHADOWS);
          if (visibility) {
            callback(cx, cy, r, visibility);
          }
          if (SHADOWS.length == 2 && SHADOWS[0][0] == 0 && SHADOWS[1][0] == SHADOWS[1][1]) {
            return;
          }
        }
      }
    }
    _checkVisibility(A1, A2, blocks, SHADOWS) {
      if (A1[0] > A2[0]) {
        let v1 = this._checkVisibility(A1, [A1[1], A1[1]], blocks, SHADOWS);
        let v2 = this._checkVisibility([0, 1], A2, blocks, SHADOWS);
        return (v1 + v2) / 2;
      }
      let index1 = 0, edge1 = false;
      while (index1 < SHADOWS.length) {
        let old = SHADOWS[index1];
        let diff = old[0] * A1[1] - A1[0] * old[1];
        if (diff >= 0) {
          if (diff == 0 && !(index1 % 2)) {
            edge1 = true;
          }
          break;
        }
        index1++;
      }
      let index2 = SHADOWS.length, edge2 = false;
      while (index2--) {
        let old = SHADOWS[index2];
        let diff = A2[0] * old[1] - old[0] * A2[1];
        if (diff >= 0) {
          if (diff == 0 && index2 % 2) {
            edge2 = true;
          }
          break;
        }
      }
      let visible = true;
      if (index1 == index2 && (edge1 || edge2)) {
        visible = false;
      } else if (edge1 && edge2 && index1 + 1 == index2 && index2 % 2) {
        visible = false;
      } else if (index1 > index2 && index1 % 2) {
        visible = false;
      }
      if (!visible) {
        return 0;
      }
      let visibleLength;
      let remove = index2 - index1 + 1;
      if (remove % 2) {
        if (index1 % 2) {
          let P = SHADOWS[index1];
          visibleLength = (A2[0] * P[1] - P[0] * A2[1]) / (P[1] * A2[1]);
          if (blocks) {
            SHADOWS.splice(index1, remove, A2);
          }
        } else {
          let P = SHADOWS[index2];
          visibleLength = (P[0] * A1[1] - A1[0] * P[1]) / (A1[1] * P[1]);
          if (blocks) {
            SHADOWS.splice(index1, remove, A1);
          }
        }
      } else {
        if (index1 % 2) {
          let P1 = SHADOWS[index1];
          let P2 = SHADOWS[index2];
          visibleLength = (P2[0] * P1[1] - P1[0] * P2[1]) / (P1[1] * P2[1]);
          if (blocks) {
            SHADOWS.splice(index1, remove);
          }
        } else {
          if (blocks) {
            SHADOWS.splice(index1, remove, A1, A2);
          }
          return 1;
        }
      }
      let arcLength = (A2[0] * A1[1] - A1[0] * A2[1]) / (A1[1] * A2[1]);
      return visibleLength / arcLength;
    }
  }

  // ../vendor_src/rot/lib/path/path.js
  class Path {
    constructor(toX, toY, passableCallback, options = {}) {
      this._toX = toX;
      this._toY = toY;
      this._passableCallback = passableCallback;
      this._options = Object.assign({
        topology: 8
      }, options);
      this._dirs = DIRS[this._options.topology];
      if (this._options.topology == 8) {
        this._dirs = [
          this._dirs[0],
          this._dirs[2],
          this._dirs[4],
          this._dirs[6],
          this._dirs[1],
          this._dirs[3],
          this._dirs[5],
          this._dirs[7]
        ];
      }
    }
    _getNeighbors(cx, cy) {
      let result = [];
      for (let i = 0;i < this._dirs.length; i++) {
        let dir = this._dirs[i];
        let x = cx + dir[0];
        let y = cy + dir[1];
        if (!this._passableCallback(x, y)) {
          continue;
        }
        result.push([x, y]);
      }
      return result;
    }
  }

  // ../vendor_src/rot/lib/path/astar.js
  class AStar extends Path {
    constructor(toX, toY, passableCallback, options = {}) {
      super(toX, toY, passableCallback, options);
      this._todo = [];
      this._done = {};
    }
    compute(fromX, fromY, callback) {
      this._todo = [];
      this._done = {};
      this._fromX = fromX;
      this._fromY = fromY;
      this._add(this._toX, this._toY, null);
      while (this._todo.length) {
        let item = this._todo.shift();
        let id = item.x + "," + item.y;
        if (id in this._done) {
          continue;
        }
        this._done[id] = item;
        if (item.x == fromX && item.y == fromY) {
          break;
        }
        let neighbors = this._getNeighbors(item.x, item.y);
        for (let i = 0;i < neighbors.length; i++) {
          let neighbor = neighbors[i];
          let x = neighbor[0];
          let y = neighbor[1];
          let id = x + "," + y;
          if (id in this._done) {
            continue;
          }
          this._add(x, y, item);
        }
      }
      let item = this._done[fromX + "," + fromY];
      if (!item) {
        return;
      }
      while (item) {
        callback(item.x, item.y);
        item = item.prev;
      }
    }
    _add(x, y, prev) {
      let h = this._distance(x, y);
      let obj = {
        x,
        y,
        prev,
        g: prev ? prev.g + 1 : 0,
        h
      };
      let f = obj.g + obj.h;
      for (let i = 0;i < this._todo.length; i++) {
        let item = this._todo[i];
        let itemF = item.g + item.h;
        if (f < itemF || f == itemF && h < item.h) {
          this._todo.splice(i, 0, obj);
          return;
        }
      }
      this._todo.push(obj);
    }
    _distance(x, y) {
      switch (this._options.topology) {
        case 4:
          return Math.abs(x - this._fromX) + Math.abs(y - this._fromY);
          break;
        case 6:
          let dx = Math.abs(x - this._fromX);
          let dy = Math.abs(y - this._fromY);
          return dy + Math.max(0, (dx - dy) / 2);
          break;
        case 8:
          return Math.max(Math.abs(x - this._fromX), Math.abs(y - this._fromY));
          break;
      }
    }
  }

  // rot.js
  window.ROT = { RNG: rng_default, Map: { Digger }, FOV: { PreciseShadowcasting }, Path: { AStar } };
})();
