import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

interface Score {
    id: number;
    name: string;
    score: number;
}

const Home = () => {

    const [scores, setScores] = useState<Score[]>([]);

    const [rules, setRules] = useState('Clique em Jogar para começar');
    const [name, setName] = useState('');
    const [score, setScore] = useState(0);
    const [record, setRecord] = useState(0);
    const [time, setTime] = useState(12);
    const [circlesPerLine, setCirclesPerLine] = useState<number>(2);
    const [circleWithDiferentColor, setCircleWithDiferentColor] = useState<[number, number]>([0, 0]);
    const [colors, setColors] = useState([0, 0, 0, 0, 0, 0]); //RGB - RGB
    const [gameOn, setGameOn] = useState(false);

    const history = useHistory();

    useEffect(() => {
        api.get('scores').then(response => {
            setScores(response.data);
        });
    }, [time]);

    useEffect(() => {
        if (gameOn === true) {
            const interval = setInterval(() => {
                if (time > 0)
                    setTime(time => time - 1);
                else
                    endGame();
            }, 1000);
            return () => clearInterval(interval);
        }
    });

    function changeStatusGame() {
        if (gameOn === true) {
            setGameOn(false);
            setCirclesPerLine(2);
            return;
        }
        setGameOn(true);
    }

    function start() {
        generateColors();
        changeCircleWithDiferentColor();
        changeStatusGame();
        setScore(0);
        setTime(12);
        setCirclesPerLine(2);
        setRules('Clique no circulo com a cor diferente');
    }

    function endGame() {
        changeStatusGame();
        setRules('Fim de jogo');

    }

    function renderCircles(circlesPerLine: Number) {
        if (gameOn === true) { //jogo rodando, mostra a tabela de circulos
            let table = []
            for (let i = 0; i < circlesPerLine; i++) {
                let children = []
                for (let j = 0; j < circlesPerLine; j++) {
                    if (i === circleWithDiferentColor[1] && j === circleWithDiferentColor[0]) {
                        children.push(
                            <td key={j} >
                                <button
                                    style={{ backgroundColor: `rgb(${colors[3]}, ${colors[4]}, ${colors[5]})` }}
                                    onClick={() => verifySelectedCircle(j, i)}
                                    id={String(i + ',' + j)}>
                                </button>
                            </td>)
                    } else {
                        children.push(
                            <td key={j} >
                                <button
                                    style={{ backgroundColor: `rgb(${colors[0]}, ${colors[1]}, ${colors[2]})` }}
                                    onClick={() => verifySelectedCircle(j, i)}
                                    id={String(i + ',' + j)}>
                                </button>
                            </td>)

                    }
                }
                table.push(<tr key={i}>{children}</tr>)
            }
            return (
                <table>
                    <tbody>
                        {table}
                    </tbody>
                </table>
            )
        }
        else { //se jogo parado
            if (gameOn === false && time === 12) { //primeira vez, o jogo não foi iniciado ainda
                return (
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <button className="start" onClick={() => start()}>Jogar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>)
            }
            else { //se jogo parado e nao for a primeira vez
                if (scores.length >= 10) { //top 10 pronto
                    if (scores[9].score < score) { //pontuação maior q o ultimo do top 10
                        return (
                            <>

                                <form onSubmit={saveRecord}>

                                    <table className="restartTable">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <p>Você entrou para o ranking do top 10 do dia!!! <br /> Digite seu nome para salvar seu recorde</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="text" maxLength={10} name="name" id="name" value={name} className="imput-name" onChange={handleInputChange} placeholder="Digite seu nome aqui" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <button type="submit" className="restart">Enviar e jogar novamente</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </form>
                            </>
                        )
                    }
                    else { //pontuação menor q o ultimo do top 10
                        return (
                            <table className="restartTable">
                                <tbody>
                                    <tr>
                                        <td>
                                            <p>Você não conseguiu entrar para<br /> o ranking do Top 10 do dia :(<br />Mas não desista, tente novamente!!</p>
                                            <button className="start" onClick={() => start()}>Tentar novamente</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>)
                    }
                }
                else {
                    return (
                        <>

                            <form onSubmit={saveRecord}>

                                <table className="restartTable">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <p>Você entrou para o ranking do top 10 do dia!!! <br /> Digite seu nome para salvar seu recorde</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <input type="text" maxLength={10} name="name" id="name" value={name} className="imput-name" onChange={handleInputChange} placeholder="Digite seu nome aqui" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <button type="submit" className="restart">Enviar e jogar novamente</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                        </>
                    )

                }
            }
        }
    }

    async function saveRecord(event: FormEvent) { //recebe o event para nao recarregar a pagina quando dar um submit
        event.preventDefault(); //nao recarregar a pagina

        const data = {
            name,
            score,
        };
        try {
            await api.post('scores', data);

            history.push('/');
        } catch (err) {
            alert('Erro no cadastro, tente novamente');
        }
        start();
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const name = event.target.value;

        setName(name);
    }

    function verifySelectedCircle(colun: number, row: number) {
        if (circleWithDiferentColor[0] === colun && circleWithDiferentColor[1] === row && gameOn === true) {
            generateColors();
            changeCircleWithDiferentColor();
            updateScore();
            updateTime();
        }
        else if (gameOn === true) {
            decreaseTime();
        }
    }

    function decreaseTime() {
        if (time > 5) setTime(time - 5);
        else {
            endGame();
            setTime(0);
        }
    }

    function updateScore() {
        const upScore = score + 1;
        if (upScore > record) {
            setRecord(upScore);
        }
        setScore((upScore));
        if (upScore % 10 === 0) {
            levelUp();
        }
    }

    function levelUp() {
        if (circlesPerLine < 7) {
            let circles = circlesPerLine + 1;
            setCirclesPerLine(circles);
        }
    }

    function updateTime() {
        const upTime = time + 6;
        if (upTime > 12) {
            setTime(12);
            return;
        }
        setTime(upTime);
    }

    function getRandom(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function changeCircleWithDiferentColor() {
        let row = getRandom(0, circlesPerLine);
        let colun = getRandom(0, circlesPerLine);
        setCircleWithDiferentColor([row, colun]);
        //console.log(colun, row);
    }

    function generateColors() {
        let red = getRandom(0, 255);
        let green = getRandom(0, 255);
        let blue = getRandom(0, 255);
        generateAproximateColor(red, green, blue);
    }

    function generateAproximateColor(red: number, green: number, blue: number) {
        let aproximatedRed, aproximatedGreen, aproximatedBlue;
        let min, max;

        switch (circlesPerLine) {
            case 2:
                min = 35;
                max = 45;
                break;
            case 3:
                min = 30;
                max = 35;
                break;
            case 4:
                min = 25;
                max = 30;
                break;
            case 5:
                min = 20;
                max = 25;
                break;
            case 6:
                min = 15;
                max = 20;
                break;
            default:
                min = 5;
                max = 15;
                break;
        }

        if (getRandom(0, 2) === 1 || circlesPerLine === 2) aproximatedRed = red + getRandom(min, max);
        else aproximatedRed = red - getRandom(min, max);

        if (getRandom(0, 2) === 1 || circlesPerLine === 2) aproximatedGreen = green + getRandom(min, max);
        else aproximatedGreen = green - getRandom(min, max);

        if (getRandom(0, 2) === 1 || circlesPerLine === 2) aproximatedBlue = blue + getRandom(min, max);
        else aproximatedBlue = blue - getRandom(min, max);

        setColors([red, green, blue, aproximatedRed, aproximatedGreen, aproximatedBlue]);
    }

    return (
        <>
            <div className="row">
                <div className="col-lg-2 col-md-1 d-none d-sm-block nono col-xl-3"></div>
                <div className="game-area col-md-6 col-xl-5 col-lg-6 col-xs-12">
                    <div className="text-center">
                        <h1>Jogo das cores</h1>
                        <p id="rule">{rules}</p>
                    </div>
                    <div className="bar">
                        <div className="bar-element">
                            <p id="time">Tempo: {time}</p>
                        </div>
                        <div className="bar-element">
                            <p id="record">Recorde: {record}</p>
                        </div>

                        <div className="bar-element">
                            <p id="score">Pontuação: {score}</p>
                        </div>

                    </div>
                    <div className="box-container" >

                        <div className="box-content" ></div>
                        <div className="box-table">
                            {renderCircles(circlesPerLine)}
                        </div>

                    </div>
                </div>
                <div className="ranking col-md-4 col-xs-12 col-xl-4 col-lg-3">
                    <h4>Top 10 do dia</h4>
                    <table className="rankingTable">
                        <thead>
                            <tr>
                                <th>Pos</th>
                                <th></th>
                                <th>Nome</th>
                                <th></th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                scores.map((score, index) => ( //para cada item
                                    <tr key={score.id}>
                                        <td>{index + 1}</td>
                                        <td>-</td>
                                        <td>{score.name}</td>
                                        <td>-</td>
                                        <td>{score.score}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                </div>
            </div>
        </>
    );
}

export default Home;