import { TextStyle } from "pixi.js";
import Container = PIXI.Container;

export default class Button extends Container {
    private _button:PIXI.Graphics
    private _textStyle:TextStyle;
    public buttonHenght:number = 100;
    private readonly _clickCallback:()=>void;
    private readonly _mouseOverCallback:()=>void;
    private readonly _mouseOutCallback:()=>void;
    public buttonName:string;

	constructor(
            buttonName:string,
            clickCallback:()=>void = null,
            mouseOverCallback:()=>void = null,
            mouseOutCallback:()=>void = null
        ){

		super();
        this._clickCallback = clickCallback;
        this._mouseOverCallback = mouseOverCallback;
        this._mouseOutCallback = mouseOutCallback;
        this.buttonName = buttonName;
        this.interactive = true;
        this.buttonMode = true;

        this._button = new PIXI.Graphics;
        this._button
            .lineStyle(1, 0x000000, 1, 0)
            .beginFill(0x228866)
            .drawRect(0, 0, 300, 70);
        // this._button.interactive = true;
        // this._button.buttonMode = true;
        this.addChild(this._button);

        this._textStyle = new PIXI.TextStyle ({
            fontFamily: 'Arial',
            fontSize: 50,
            fontWeight: 'bold',
            fill: ['#000000'],
        });

        const buttonText:PIXI.Text = new PIXI.Text (buttonName, this._textStyle);
        buttonText.x = (this._button.width - buttonText.width)/2;
        buttonText.y = (this._button.height - buttonText.height)/2;
        this._button.addChild(buttonText);

        if (clickCallback) {
			this.addListener('pointertap', this.pointerTabHandler, this);
		}

        if (mouseOverCallback) {
			this.addListener('mouseover', this.mouseOverHandler, this);
		}

        if (mouseOutCallback) {
			this.addListener('mouseout', this.mouseOutHandler, this);
		}
	}

    private pointerTabHandler():void {
		this._clickCallback();
	}

    private mouseOverHandler():void {
		this._mouseOverCallback();
        this._button.tint = (0x000000);
        this._textStyle.fill = '#ffffff'
	}

    private mouseOutHandler():void {
		this._mouseOutCallback();
        this._button.tint = (0xffffff);
        this._textStyle.fill = '#000000'
	}
}