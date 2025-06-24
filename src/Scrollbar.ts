import Container = PIXI.Container;

export default class Scrollbar extends Container {
    public thumb :PIXI.Graphics;
    private _track:PIXI.Graphics;
    private _trackWidth:number;
    private _trackHeight:number;
    private _thumbHeight:number;

    constructor(windowWidth:number, windowHeight:number, thumbHeight:number){
        super();
        this._trackWidth = windowWidth/100;
        this._trackHeight = windowHeight;
        this._thumbHeight = thumbHeight;
        this.createTrack();
        this.createThumb();
    }

    private createTrack():void {
        this._track = new PIXI.Graphics;
        this._track
            .lineStyle(1, 0x000000, 1, 0)
            .beginFill(0x779933, .5)
            .drawRect(0, 0, this._trackWidth, this._trackHeight);
        this.addChild(this._track);
	}

    private createThumb():void {
        this.thumb = new PIXI.Graphics;
        this.thumb
            .lineStyle(1, 0x000000, 1, 0)
            .beginFill(0x447700)
            .drawRect(0, 0, this._trackWidth, this._thumbHeight);
            this.thumb.interactive = true;
            this.thumb.buttonMode = true;
        this.addChild(this.thumb);
	}
}
