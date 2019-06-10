$(document).ready(function () {

    $("#result").hide();
    $("#hid").hide();

    var maxPCard = 0, maxDCard = 0, PValue = 0, DValue = 0;
    var PlayerDeck = [];
    var DealerDeck = [];
    var NewDeck = [];

    $("#NewGame").click(function () {

        NewGame();

        for (var i = 3; i <= 5; i++) {
            document.getElementById(`dCard${i}`).innerHTML = "";
            document.getElementById(`pCard${i}`).innerHTML = "";
        }

        NewDeck = ShuffleNewD();

        var dCard1 = NewDeck.shift();
        DealerDeck.push(dCard1);
        var pCard1 = NewDeck.shift();
        PlayerDeck.push(pCard1);
        var dCard2 = NewDeck.shift();
        DealerDeck.push(dCard2);
        var pCard2 = NewDeck.shift();
        PlayerDeck.push(pCard2);

        document.getElementById('dCard1').innerHTML = dCard1;
        document.getElementById('pCard1').innerHTML = pCard1;
        document.getElementById('dCard2').innerHTML = dCard2;
        document.getElementById('pCard2').innerHTML = pCard2;

        maxPCard = 2;
        maxDCard = 2;

        DValue = CalculateCardValue(DealerDeck);
        PValue = CalculateCardValue(PlayerDeck);

        if (DValue == 21) {
            document.getElementById('result').innerHTML = "Dealer Win !";
            $("#result").show();

        } else if (PValue == 21) {
            document.getElementById('result').innerHTML = "Player Win !";
            $("#result").show();

        }

        $("#dCard1").hide();

    });


    $("#draw").click(function () {
        debugger;
        if (maxPCard != 5) {
            var c = NewDeck.shift();
            PlayerDeck.push(c);
            PValue = CalculateCardValue(PlayerDeck);
            maxPCard++;

            document.getElementById(`pCard${maxPCard}`).innerHTML = c;

            if (PValue > 21) {
                document.getElementById('result').innerHTML = "Dealer Win !";
                $("#draw").attr("disabled", true);
                $("#stand").attr("disabled", true);
                $("#dCard1").show();
                $("#hid").hide();
                $("#result").show();
            }

        }

        if (maxPCard == 5 && PValue < 21) {

            while (maxDCard != 5 && DValue <= 21) {
                var x = NewDeck.shift();
                DealerDeck.push(x);
                DValue = CalculateCardValue(DealerDeck);
                maxDCard++;

                document.getElementById(`dCard${maxDCard}`).innerHTML = x;

                if (DValue >= 16) {

                    if (DValue == 21 || (DValue > PValue && DValue < 21)) {
                        document.getElementById('result').innerHTML = "Dealer Win !";


                    } else {
                        document.getElementById('result').innerHTML = "Player Win !";
                    }

                    $("#result").show();
                    break;
                }
            }

            $("#stand").attr("disabled", true);
            $("#draw").attr("disabled", true);
            $("#hid").hide();
            $("#dCard1").show();
        }

    });


    $("#stand").click(function () {

        $("#draw").attr("disabled", true);

        if (PValue < 21) {

            while (maxDCard != 5 && DValue <= 21) {
                var x = NewDeck.shift();
                DealerDeck.push(x);
                DValue = CalculateCardValue(DealerDeck);
                maxDCard++;

                document.getElementById(`dCard${maxDCard}`).innerHTML = x;


                if (DValue >= 16) {

                    if (DValue == 21 || (DValue > PValue && DValue < 21)) {
                        document.getElementById('result').innerHTML = "Dealer Win !";


                    } else {
                        document.getElementById('result').innerHTML = "Player Win !";
                    }

                    $("#draw").attr("disabled", true);
                    $("#stand").attr("disabled", true);
                    $("#dCard1").show();
                    $("#hid").hide();
                    $("#result").show();
                    break;
                }


            }

        }

    });

    function YatesShuffle(array_elements) {

        var i = array_elements.length, randomNum, randomNumIndex;

        while (--i > 0) {

            randomNum = Math.floor(Math.random() * (i + 1));
            randomNumIndex = array_elements[randomNum];
            array_elements[randomNum] = array_elements[i];
            array_elements[i] = randomNumIndex;
        }

        return array_elements;
    }


    function ShuffleNewD() {
        const deck = [];
        const suit = ["Spade", "Heart", "Club", "Diamond"];
        const face = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

        suit.forEach(function (_suit) {
            face.forEach(function (_face) {
                deck.push(_suit + " " + _face);
            });
        });

        YatesShuffle(deck);

        return deck;

    }

    function CalculateCardValue(array_handCard) {

        var totalValue = 0;

        array_handCard.forEach(function (card) {

            var lastletter;

            lastletter = card[card.length - 1];

            if (lastletter == "0") {
                lastletter = "10";
            }

            switch (lastletter) {

                case "A":

                    if (array_handCard.length == 2) {
                        totalValue += 11;
                    } else {
                        totalValue += 1;
                    }

                    break;

                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                case "10":

                    totalValue += parseInt(lastletter);

                    break;

                case "J":
                case "Q":
                case "K":

                    totalValue += 10;

                    break;
            }
        });

        return totalValue;
    }

    function NewGame() {
        $("#result").hide();
        $("#draw").attr("disabled", false);
        $("#stand").attr("disabled", false);
        $("#dCard1").hide();
        $("#hid").show();

        maxPCard = 0;
        maxDCard = 0;
        PValue = 0;
        DValue = 0;
        PlayerDeck = [];
        DealerDeck = [];
        NewDeck = [];
    }
})

