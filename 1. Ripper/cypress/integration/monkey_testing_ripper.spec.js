describe('Los estudiantes under monkeys', function() {
    it('visits los estudiantes and survives monkeys', function() {
        cy.visit('https://todoist.com/es');
        cy.contains('Cerrar').click();
        cy.wait(1000);
        randomClick(10);
    })

    it('Ripper test', function () {
        cy.visit('https://todoist.com/es');
        cy.contains('Cerrar').click();
        cy.wait(1000);
        randomEvent(50);
    })

})

function randomClick(monkeysLeft) {

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };

    var monkeysLeft = monkeysLeft;
    if(monkeysLeft > 0) {
        cy.get('a').then($links => {
            var randomLink = $links.get(getRandomInt(0, $links.length));
            if(!Cypress.dom.isHidden(randomLink)) {
                cy.wrap(randomLink).click({force: true});
                monkeysLeft = monkeysLeft - 1;
            }
            cy.wait(1000);
            randomClick(monkeysLeft);
        });
    }   
}

function randomEvent(monkeysLeft) {

    function getRandomInt(min, max) {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min)) + min;
    };
  
    //Funcion para seleccionar aleatoriamente el tipo de objeto
    function getRandomTypeObject() {
        var objects = ["a","input","select", "button"]
        return objects[Math.floor(Math.random() * objects.length)];
    };
    
    //Funcion para generar palabras aleatoriamente
    function randomWord() {
        var word = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 9);
        return word;
    };

    if(monkeysLeft > 0) {

        //se selecciona objeto aleatoriamente 
        var randomObject = getRandomTypeObject();
        
        cy.get("body").then($body => {
            if ($body.find(randomObject).length > 0) {   
                cy.get(randomObject).then($objects => {
                    var ro = $objects.get(getRandomInt(0, $objects.length));
                    cy.log(ro)
                    if (!Cypress.dom.isHidden(ro)) {
                        //dependiendo del tipo de objeto seleccionado, se aplica la logica correspondiente
                        switch (String(randomObject)) {
                            case 'a':
                                //si es un link, se le hace clic
                                cy.wrap(ro).click({ force: true });
                                break;
                            case 'input':
                                //si es un input, se genera una palabra al azar para llenar el campo
                                cy.wrap(ro).click({ force: true }).type(randomWord(), { force: true });;
                                break;
                            case 'select':
                                //Si es un combo se selecciona una opcion al azar
                                cy.wrap(ro).children('option').eq(getRandomInt(0, ro.options.length)).then(e => { cy.wrap(ro).select(e.val(), { force: true }); });
                                break;
                            case 'button':
                                //si es un boton, se le hace clic
                                cy.wrap(ro).click({ force: true });
                                break;
                            default:
                                break;
                        }
                    }
                })
            }
        });

        monkeysLeft = monkeysLeft - 1;
        cy.wait(1000);
        randomClick(monkeysLeft);
    }
  }