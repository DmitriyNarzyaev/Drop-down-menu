import Container = PIXI.Container;
import { Graphics, Loader, Sprite, TextStyle } from "pixi.js";
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

	private _personageImage:Sprite;		//TEST

	private _startButtonNames:string[] = ["Империум", "Эльдар", "Империя Тау", "Хаос", "Орки", "Некроны"];
	private _subButtonOneNames:string[] = ["Калдор Драйго", "Кайафас Каин", "Стракен", "Данте"	]				//Империум
	private _subButtonTwoNames:string[] = ["Эльдрад Ультран", "Джайн Зар", "Мауган Ра", "Амаллин" ]				//Эльдар
	private _subButtonThreeNames:string[] = ["Эль'Миямото", "О'Шасерра", "Фарсайт"]								//Тау
	private _subButtonFourNames:string[] = ["Эзекиль Абаддон", "Калас Тифон", "Некрозий", "Джихар", "Кхарн"]	//Хаос
	private _subButtonFiveNames:string[] = ["Грог Железнозуб", "Ваздакка Гуцмек", "Док Гротсник", "Снагрод"]	//Орки
	private _subButtonSixNames:string[] = ["Иллюминор Серас", "Анракир", "Орикан"]								//Некроны

	constructor() {
		super();
		this.pictureLoader();
	}

	private pictureLoader():void {						//TEST
		const loader:Loader = new Loader();
		loader.add("Калдор Драйго", "draigo.jpg");
		loader.add("Кайафас Каин", "kain.png");
		loader.add("Стракен", "straken.jpg");
		loader.add("Данте", "dante.jpg");

		loader.add("Эльдрад Ультран", "ultran.jpg");
		loader.add("Джайн Зар", "jainzar.jpg");
		loader.add("Мауган Ра", "mauganra.png");
		loader.add("Амаллин", "amallyn.jpg");

		loader.add("Эль'Миямото", "elmyamoto.jpg");
		loader.add("О'Шасерра", "oshaserra.png");
		loader.add("Фарсайт", "farsight.jpg");

		loader.add("Эзекиль Абаддон", "abaddon.jpg");
		loader.add("Калас Тифон", "typhon.png");
		loader.add("Некрозий", "necrosius.jpg");
		loader.add("Джихар", "jihar.jpg");
		loader.add("Кхарн", "kharn.jpg");
		
		loader.load((loader, resources)=> {
				this.startProject();
		});
		loader.load();
	}

	private startProject():void {
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
		const gap:number = 20;
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

		this._personageImage = Sprite.from(content);
		this._contentContainer.addChild(this._personageImage);
		let standartWidth = this._personageImage.width;
		this._personageImage.width = contentBackground.width/2;
		this._personageImage.height /=  standartWidth/this._personageImage.width;
		this._personageImage.x = this._contentContainer.width/2 - this._personageImage.width/2;
		this._personageImage.y = gap;

		let textContent:string = Content.initialText(content);
		const contentText:PIXI.Text = new PIXI.Text (textContent, textStyle);
        contentText.x = gap;
        contentText.y = this._personageImage.height + gap*2;
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

	private buttonTouchFunctions(button:Button):void {					//TEST
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