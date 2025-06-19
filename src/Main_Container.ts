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

	private _startButtonNames:string[] = ["Империум", "Эльдар", "Тау", "Хаос", "Орки", "Некроны"];
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

	private pictureLoader():void {
		const loader:PIXI.Loader = new PIXI.Loader();
		loader
			.add(this._startButtonNames[0], "imperium.jpg")			//0
			.add(this._startButtonNames[1], "eldar.jpg")
			.add(this._startButtonNames[2], "tau.jpg")
			.add(this._startButtonNames[3], "chaos.jpg")
			.add(this._startButtonNames[4], "orks.jpg")
			.add(this._startButtonNames[5], "necrons.jpg")
			.add(this._subButtonOneNames[0], "draigo.jpg")			//1
			.add(this._subButtonOneNames[1], "kain.jpg")
			.add(this._subButtonOneNames[2], "straken.jpg")
			.add(this._subButtonOneNames[3], "dante.jpg")
			.add(this._subButtonTwoNames[0], "ultran.jpg")			//2
			.add(this._subButtonTwoNames[1], "jainzar.jpg")
			.add(this._subButtonTwoNames[2], "mauganra.jpg")
			.add(this._subButtonTwoNames[3], "amallyn.jpg")
			.add(this._subButtonThreeNames[0], "elmyamoto.jpg")		//3
			.add(this._subButtonThreeNames[1], "oshaserra.jpg")
			.add(this._subButtonThreeNames[2], "farsight.jpg")
			.add(this._subButtonFourNames[0], "abaddon.jpg")		//4
			.add(this._subButtonFourNames[1], "typhon.jpg")
			.add(this._subButtonFourNames[2], "necrosius.jpg")
			.add(this._subButtonFourNames[3], "jihar.jpg")
			.add(this._subButtonFourNames[4], "kharn.jpg")
			.add(this._subButtonFiveNames[0], "grog.jpg")			//5
			.add(this._subButtonFiveNames[1], "wazdakka.jpg")
			.add(this._subButtonFiveNames[2], "dok.jpg")
			.add(this._subButtonFiveNames[3], "snagrod.jpg")
			.add(this._subButtonSixNames[0], "seras.jpg")			//6
			.add(this._subButtonSixNames[1], "anrakyr.jpg")
			.add(this._subButtonSixNames[2], "orikan.jpg")

		loader.load((loader, resources)=> {
			this.startProject();
		});
	}

	private startProject():void {
		this.initialBackground();
			this._buttonsContainer = new PIXI.Container;
			this.addChild(this._buttonsContainer);
		this.initialButtons(this._buttonsContainer, this._startButtonNames, false);
		this.initialContent(" ");
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
			
		if (content!=" "){
			let personageImage:PIXI.Sprite = PIXI.Sprite.from(content);
			let standartWidth = personageImage.width;
			personageImage.width = contentBackground.width/2;
			personageImage.height /=  standartWidth/personageImage.width;
			personageImage.x = this._contentContainer.width/2 - personageImage.width/2;
			personageImage.y = gap;
			this._contentContainer.addChild(personageImage);

			let textContent:string = Content.initialText(content);
			const contentText:PIXI.Text = new PIXI.Text (textContent, textStyle);
			contentText.x = gap;
			contentText.y = personageImage.height + gap*2;
			contentText.style.wordWrap = true;
			contentText.style.wordWrapWidth = contentBackground.width  - gap*2;
			this._contentContainer.addChild(contentText);
			console.log("content button " + contentText as string);
		};
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
