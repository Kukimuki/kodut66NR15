// Impordi 'express' moodul, mis on veebirakenduste raamistik.
const express = require('express');

// Impordi 'Wish' klass, mis on defineeritud teises failis.
const Wish = require('./model/wish');

// Loo uus Express rakendus.
const app = express();

// Määra vaate mootoriks 'ejs'.
app.set('view engine', 'ejs');

// Kasuta 'express.urlencoded' middleware'i, et saaksid töödelda URL-kodeeritud POST andmeid.
app.use(express.urlencoded({extended: true}));

// Määra staatiliste failide kaustaks 'public'.
app.use(express.static('public'));

// Defineeri marsruut GET päringutele juur-URL-ile ('/').
app.get('/', (req, res) =>{
    // Kutsu 'fetchAllWishes' meetodit 'Wish' klassilt.
    Wish.fetchAllWishes(wishesFromFile => {
        // Logi konsooli kõik soovid failist.
        console.log(wishesFromFile);
        // Renderda 'index' vaade, edastades sinna 'myWishes' muutujana kõik soovid failist.
        res.render('index', {myWishes: wishesFromFile}); 
    });
});

// Defineeri marsruut POST päringutele URL-ile '/wish'.
app.post('/wish', (req, res) => {
    // Salvesta kasutaja sisestatud soov muutujasse 'userData'.
    let userData = req.body.userWish;

    // Loo uus 'Wish' objekt kasutaja sisestatud sooviga.
    let newWish = new Wish(userData);
    // Kutsu 'saveWish' meetodit uuel soovi objektil.
    newWish.saveWish();
    // Suuna kasutaja tagasi juur-URL-ile ('/').
    res.redirect('/');
});

// Määra serveri port numbriks 5000.
const port = 5000;

// Käivita server määratud pordil.
app.listen(port, () => {
    // Logi konsooli teade, et server on käivitatud.
    console.log(`Server is running ${port}.`);
});