import Container = PIXI.Container;

export default class Content extends Container {
    private _background:PIXI.Graphics
    private _textStyle: PIXI.TextStyle;
    private static draigo:string = "        Калдор Драйго \nВерховный великий магистр ордена Серых Рыцарей. Драйго нанёс смертельный удар принцу демонов М'кару Возрождённому" +
        " и изгнал дьявольские полчища обратно в варп. Однако демон наложил на Драйго проклятие: если он когда-нибудь снова ступит на землю этого мира, то будет десять"+
        " тысячелетий скитаться по пути проклятия вместе со всеми своими последователями.";
    
        private static kain:string = "        Комиссар Кайафас Каин\nПропаганда Империума придала Каину образ великого героя, хотя на деле на протяжении всей своей"+
        " долгой карьеры он был сфокусирован на собственном выживании. Несмотря на это, Каин выгодно отличается от большинства комиссаров тем, что жертвует своими солдатами"+
        " только в крайнем случае и предпочитает быть для них любимым и уважаемым командиром, а не ненавистным надзирателем.";

    constructor(){
        super();  
    }

    public static initialText(text:string):string {
        let returnText:string;
        if (text == "Калдор Драйго") {
            returnText = Content.draigo;
        } else if (text == "Кайафас Каин") {
            returnText = Content.kain;
        }
        return returnText;
    }
}