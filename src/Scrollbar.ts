import Container = PIXI.Container;

export default class Scrollbar extends Container {
    private _track:PIXI.Graphics;
    private _thumb :PIXI.Graphics;
    private _trackWidth:number;
    private _trackHeight:number;

    constructor(windowWidth:number, windowHeight:number){
        super();
        this._trackWidth = windowWidth/100;
        this._trackHeight = windowHeight;
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
        let thumbHeight = 50;           //TEST
        this._thumb = new PIXI.Graphics;
        this._thumb
            .lineStyle(1, 0x000000, 1, 0)
            .beginFill(0x447700)
            .drawRect(0, 0, this._trackWidth, thumbHeight);
        this.addChild(this._thumb);
        this._thumb.interactive = true;
        this._thumb.buttonMode = true;

	}
}
