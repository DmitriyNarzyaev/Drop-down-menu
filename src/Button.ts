import { TextStyle } from "pixi.js";
import Container = PIXI.Container;

export default class Button extends Container {
    private _background:PIXI.Graphics
    private _textStyle:TextStyle;
    private readonly _clickCallback:()=>void;
    private readonly _mouseOverCallback:()=>void;
    private readonly _mouseOutCallback:()=>void;
    private readonly _touchCallback:()=>void;
    public buttonWidth:number;
    public buttonHenght:number;
    public buttonName:string;

	constructor(
            buttonWidth:number,
            buttonHeight:number,
            buttonName:string,
            clickCallback:()=>void = null,
            mouseOverCallback:()=>void = null,
            mouseOutCallback:()=>void = null,
            touchCallback:()=>void = null
        ){
		super();
        this._clickCallback = clickCallback;
        this._mouseOverCallback = mouseOverCallback;
        this._mouseOutCallback = mouseOutCallback;
        this._touchCallback = touchCallback;
        this.buttonWidth = buttonWidth;
        this.buttonHenght = buttonHeight;
        this.buttonName = buttonName;
        this.interactive = true;

        this._background = new PIXI.Graphics;
        this._background
            .lineStyle(1, 0x000000, 1, 0)
            .beginFill(0x228866)
            .drawRect(0, 0, this.buttonWidth, this.buttonHenght);
        this._background.interactive = true;
        this._background.buttonMode = true;
        this.addChild(this._background);

        this._textStyle = new PIXI.TextStyle ({
            fontFamily: 'Arial',
            fontSize: this.buttonHenght/1.9,
            fontWeight: 'bold',
            fill: ['#000000'],
        });

        const buttonText:PIXI.Text = new PIXI.Text (buttonName, this._textStyle);
        buttonText.x = (this._background.width - buttonText.width)/2;
        buttonText.y = (this._background.height - buttonText.height)/2;
        this._background.addChild(buttonText);

        if (clickCallback) {
			this._background.addListener('pointertap', this.pointerTabHandler, this);
			//this._background.addListener('touchstart', this.pointerTabHandler, false);
		}

        if (mouseOverCallback) {
			this.addListener('mouseover', this.mouseOverHandler, this);
		}

        if (mouseOutCallback) {
			this.addListener('mouseout', this.mouseOutHandler, this);
		}

        if (touchCallback) {
			this.addListener('touchstart', this.mouseTouchCallback, this);
		}
	}

    private pointerTabHandler():void {
		this._clickCallback();
	}

    private mouseOverHandler():void {
		this._mouseOverCallback();
        this._background.tint = (0x000000);
        this._textStyle.fill = '#ffffff'
	}

    private mouseOutHandler():void {
		this._mouseOutCallback();
        this._background.tint = (0xffffff);
        this._textStyle.fill = '#000000'
	}

    private mouseTouchCallback():void {
		this._touchCallback();
	}
}
