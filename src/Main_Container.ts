import Container = PIXI.Container;
import { Graphics, TextStyle } from "pixi.js";
import Button from "./Button";
import Content from "./Content";

export default class Main_Container extends Container {
	public static readonly WINDOW_WIDTH:number = window.outerWidth;
	public static readonly WINDOW_HEIGHT:number = window.innerHeight;
	private _contentContainer:PIXI.Container;
	private _buttonsContainer:PIXI.Container;
	private _subButtonsContainer:PIXI.Container;
	private _buttonWidth:number = window.outerWidth/4.5;
	private _buttonHeight:number = this._buttonWidth/5;
	private _startButtonNames:string[] = [
		"Империум",
		"Эльдар",
		"Империя Тау",
		"Хаос",
		"Орки",
		"Некроны"
	];
	private _subButtonOneNames:string[] = [		//Империум
		"Калдор Драйго",
		"Кайафас Каин",
		"Стракен",
		"Данте"
		
	]
	private _subButtonTwoNames:string[] = [		//Эльдар
		"Эльдрад Ультран",
		"Джайн Зар",
		"Мауган Ра",
		"Амаллин"
	]
	private _subButtonThreeNames:string[] = [	//Тау
		"Эль'Миямото",
		"О'Шасерра",
		"Фарсайт"
	]
	private _subButtonFourNames:string[] = [	//Хаос
		"Эзекиль Абаддон",
		"Калас Тифон",
		"Некрозий",
		"Джихар",
		"Кхарн"
	]

	private _subButtonFiveNames:string[] = [	//Орки
		"Грог Железнозуб",
		"Ваздакка Гуцмек",
		"Красный Гоббо",
		"Док Гротсник"
	]

	private _subButtonSixNames:string[] = [	//Некроны
		"Иллюминор Серас",
		"Анракир",
		"Орикан"
	]

	constructor() {
		super();
		this.initialBackground();
			this._buttonsContainer = new PIXI.Container;
			this.addChild(this._buttonsContainer);
		this.initialButtons(this._buttonsContainer, this._startButtonNames, false);
		this.initialContent("");
	}

	private initialBackground():void {
		let background: Graphics = new Graphics;
		background.beginFill(0x00ff48);
		background.drawRect(0, 0, Main_Container.WINDOW_WIDTH, Main_Container.WINDOW_HEIGHT);
		this.addChild(background);
	}
	
	private initialContent(content:string):void {
		const gap:number = 50;
		this._contentContainer = new PIXI.Container;
		this.addChild(this._contentContainer);

		let contentBackground:PIXI.Graphics = new PIXI.Graphics;
		contentBackground
			.beginFill(0x0000ff, .2)
			.drawRect(0, 0, Main_Container.WINDOW_WIDTH/2, Main_Container.WINDOW_HEIGHT);
		this._contentContainer.addChild(contentBackground);
		this._contentContainer.x = Main_Container.WINDOW_WIDTH/2;

		let textStyle:TextStyle = new PIXI.TextStyle ({
            fontFamily: 'Arial',
            fontSize: contentBackground.width/25,
            fill: ['#000000'],
			align: 'left'
        });

		let textContent:string = Content.initialText(content);
		const contentText:PIXI.Text = new PIXI.Text (textContent, textStyle);
        contentText.x = gap;
        contentText.y = gap;
		contentText.style.wordWrap = true;
		contentText.style.wordWrapWidth = contentBackground.width  - gap*2;
        this._contentContainer.addChild(contentText);
		console.log("content button " + contentText as string);
	}

	private removeContent():void {
		this.removeChild(this._contentContainer);
	}

	private initialButtons(container:PIXI.Container, buttonNames:string[], sub:boolean):void {
		let buttonX;
		let buttonY:number = Main_Container.WINDOW_HEIGHT/40;
		if (sub) {
			buttonX = this._buttonWidth-1;
			buttonY = 0;
		} else {
			buttonX = Main_Container.WINDOW_WIDTH/60;
		}

		for (let i:number = 0; i<buttonNames.length; i++) {
			let button:Button = new Button(
				this._buttonWidth,
				this._buttonHeight,
				buttonNames[i],
				() => {this.buttonClickFunctions(button);},
				() => {this.buttonMouseOverFunctions(button);},
				() => {this.buttonMouseOutFunctions(button);},
				() => {this.buttonTouchFunctions(button);}
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
		console.log("click button " + button.buttonName);
	}

	private buttonMouseOverFunctions(button:Button):void {
		this.startSubButtonFunction(button);
	}

	private buttonMouseOutFunctions(button:Button):void {
		button.removeChild(this._subButtonsContainer);
	}

	private buttonTouchFunctions(button:Button):void {
	}

	private startSubButtonFunction(button:Button):void {
		if (button.buttonName == this._startButtonNames[0]) {
			this.buttonOneFunction(button);
		} else if (button.buttonName == this._startButtonNames[1]) {
			this.buttonTwoFunction(button);
		} else if (button.buttonName == this._startButtonNames[2]) {
			this.buttonThreeFunction(button);
		} else if (button.buttonName == this._startButtonNames[3]) {
			this.buttonFourFunction(button);
		} else if (button.buttonName == this._startButtonNames[4]) {
			this.buttonFiveFunction(button);
		} else if (button.buttonName == this._startButtonNames[5]) {
			this.buttonSixFunction(button);
		}
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

	private buttonFourFunction(button:Button):void {
		this._subButtonsContainer = new PIXI.Container;
		button.addChild(this._subButtonsContainer);
		this.initialButtons(this._subButtonsContainer, this._subButtonFourNames, true);
	}

	private buttonFiveFunction(button:Button):void {
		this._subButtonsContainer = new PIXI.Container;
		button.addChild(this._subButtonsContainer);
		this.initialButtons(this._subButtonsContainer, this._subButtonFiveNames, true);
	}

	private buttonSixFunction(button:Button):void {
		this._subButtonsContainer = new PIXI.Container;
		button.addChild(this._subButtonsContainer);
		this.initialButtons(this._subButtonsContainer, this._subButtonSixNames, true);
	}
}