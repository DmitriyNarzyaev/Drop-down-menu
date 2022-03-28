import Container = PIXI.Container;
import { Graphics, TextStyle } from "pixi.js";
import Button from "./Button";

export default class Main_Container extends Container {
	public static readonly WIDTH:number = 1500;
	public static readonly HEIGHT:number = 800;
	private _contentContainer:PIXI.Container;
	private _buttonsContainer:PIXI.Container;
	private _subButtonsContainer:PIXI.Container;
	private _startButtonNames:string[] = [
		"button one",
		"button two",
		"button three",
		"button four",
		"button five",
		"button six",
	];
	private _subButtonOneNames:string[] = [
		"sub 1 - 1",
		"sub 1 - 2",
		"sub 1 - 3",
	]
	private _subButtonTwoNames:string[] = [
		"sub 2 - 1",
		"sub 2 - 2",
		"sub 2 - 3",
		"sub 2 - 4",
		"sub 2 - 5",
	]
	private _subButtonThreeNames:string[] = [
		"sub 3 - 1",
		"sub 3 - 2",
	]

	constructor() {
		super();
		this.initialBackground();
			this._buttonsContainer = new PIXI.Container;
			this.addChild(this._buttonsContainer);
		this.initialButtons(this._buttonsContainer, this._startButtonNames, false);
		this.initialContent("press button");
	}

	private initialBackground():void {
		let background: Graphics = new Graphics;
		background.beginFill(0x00ff48);
		background.drawRect(0, 0, Main_Container.WIDTH, Main_Container.HEIGHT);
		this.addChild(background);
	}
	
	private initialContent(content:string):void {
		const gap:number = 50;
		this._contentContainer = new PIXI.Container;
		this.addChild(this._contentContainer);

		let contentBackground:PIXI.Graphics = new PIXI.Graphics;
		contentBackground
			.beginFill(0x0000ff, .2)
			.drawRect(0, 0, Main_Container.WIDTH/2, Main_Container.HEIGHT);
		this._contentContainer.addChild(contentBackground);
		this._contentContainer.x = Main_Container.WIDTH/2;

		let textStyle:TextStyle = new PIXI.TextStyle ({
            fontFamily: 'Arial',
            fontSize: 50,
            fontWeight: 'bold',
            fill: ['#000000'],
        });

		const contentText:PIXI.Text = new PIXI.Text (content, textStyle);
        contentText.x = gap;
        contentText.y = gap;
        this._contentContainer.addChild(contentText);
	}

	private removeContent():void {
		this.removeChild(this._contentContainer);
	}

	private initialButtons(container:PIXI.Container, buttonNames:string[], sub:boolean):void {
		let buttonX;
		let buttonY:number = 0;
		if (sub) {
			buttonX = 300;
		} else {
			buttonX = 50;
		}

		for (let i:number = 0; i<buttonNames.length; i++) {
			let button:Button = new Button(
				buttonNames[i],
				() => {this.buttonClickFunctions(button);},
				() => {this.buttonMouseOverFunctions(button);},
				() => {this.buttonMouseOutFunctions(button);},
			);
			button.x = buttonX;
			button.y = buttonY;
			container.addChild(button);
			buttonY += button.height - 1;
		}
	}

	private buttonClickFunctions(button:Button):void {
		this.removeContent();
		this.initialContent(button.buttonName);
	}

	private buttonMouseOverFunctions(button:Button):void {
		console.log("over " + button.buttonName);
		
		if (button.buttonName == "button one") {
			this.buttonOneFunction(button);
		} else if (button.buttonName == "button two") {
			this.buttonTwoFunction(button);
		} else if (button.buttonName == "button three") {
			this.buttonThreeFunction(button);
		}
	}

	private buttonMouseOutFunctions(button:Button):void {
		console.log("out " + button.buttonName);
		button.removeChild(this._subButtonsContainer);
	}

	private buttonOneFunction(button:Button):void {
		this._subButtonsContainer = new PIXI.Container;
		button.addChild(this._subButtonsContainer);
		this.initialButtons(this._subButtonsContainer, this._subButtonOneNames, true);
	}

	private buttonTwoFunction(button:Button):void {
		this._subButtonsContainer = new PIXI.Container;
		button.addChild(this._subButtonsContainer);
		this.initialButtons(this._subButtonsContainer, this._subButtonTwoNames, true);
	}

	private buttonThreeFunction(button:Button):void {
		this._subButtonsContainer = new PIXI.Container;
		button.addChild(this._subButtonsContainer);
		this.initialButtons(this._subButtonsContainer, this._subButtonThreeNames, true);
	}	
}