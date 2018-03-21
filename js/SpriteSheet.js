/**
 * @constructor @image @width @height => 赋值给this  其中的 @width 和 @height 是瓦片的基准大小

 *
 */

export default class SpriteSheet {
    constructor(image, width, height) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.tiles = new Map();
    }

    /*
     * @define 定义一个buffer（canvas对象），命令 @name 存放在tiles（瓦片）里面
     * buffer展示 裁剪 image 得到的图片，所以传入 坐标x,y 大小width height
     * 裁剪的大小 为传入的 高宽，buffer的大小也是传入的高宽
     * */
    define(name, x, y, width, height) {
        const buffer = document.createElement('canvas');
        buffer.width = width;
        buffer.height = height;
        buffer.getContext('2d')
            .drawImage(this.image,
                // 雪碧图坐标
                x,
                y,
                // 雪碧图裁剪的大小
                width,
                height,
                // 裁剪的图片在buffer上的坐标点
                0,
                0,
                // buffer的大小
                width,
                height);
        this.tiles.set(name, buffer)
    }

    defineTile(name, x, y) {
        this.define(name, x * this.width, y * this.height, this.width, this.height)
    }

    /*
    * @name 从titles获取buffer的名字
    * @context 上下文canvas实例，将会调用他上面的drawImage
    * @x，y  坐标
    * */
    draw(name, context, x, y) {
        const buffer = this.tiles.get(name);
        context.drawImage(buffer, x, y);
    }

    drawTile(name, context, x, y) {
        this.draw(name, context, this.width * x, this.height * y)
    }
}
