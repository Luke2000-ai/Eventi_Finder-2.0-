import { useState, useEffect } from "react";
// import './ListaOggetti.css';
export default function ListaOggetti() {
    const NOME_LISTA = "eventi";
    // USE STATE
    const [eventi, setEventi] = useState(() => {
        const eventiSalvati = localStorage.getItem(NOME_LISTA);
        return eventiSalvati ? JSON.parse(eventiSalvati) : [];  
    });

    const [titolo,setTitolo] = useState("");
    const [data,setData] = useState("");
    const [luogo,setLuogo] = useState("");
    const [categoria,setCategoria] = useState("");
    const [prezzo, setPrezzo] = useState(null);
    const [modalitaModifica, setModalitaModifica] = useState(false);
    const [indiceModifica, setIndiceModifica] = useState("");

    // USE EFFECT

    useEffect(() => {
        localStorage.setItem(NOME_LISTA, JSON.stringify(eventi));
    },[eventi]);

    function aggiungiEvento() {
        if(!titolo.trim() || !data.trim() || !luogo.trim() || !categoria.trim() || !prezzo.trim()) return; //controllo? solo titolo?
        const nuovoEvento = {
            titolo: titolo.trim(),
            data: data.trim(),
            luogo: luogo.trim(),
            categoria: categoria.trim(),
            prezzo: Number(prezzo)
        };

        if(modalitaModifica) {
            setEventi(arrayPrecedentementeSalvato =>
                arrayPrecedentementeSalvato.map((evento,indice) => (indice === indiceModifica) ? nuovoEvento : evento)
            );
            setModalitaModifica(false);
        } else {
            setEventi(arrayPrecedentementeSalvato => [...arrayPrecedentementeSalvato, nuovoEvento]);
        }

        // svuoto i campi di input

        setTitolo("");
        setData("");
        setLuogo("");
        setCategoria("");
        setPrezzo("");
    }

    function eliminaEvento(index) {

        if(window.confirm("Sei sicuro di eliminare questo evento?")) {
            setEventi(arrayPrecedentementeSalvato => arrayPrecedentementeSalvato.filter((_,i) => i !== index));
        }
    }

    /* carico i dati, provenienti dal LS, negli input */

    function modificaEvento(indice) {
        setModalitaModifica(true);
        const eventoDaModificare = eventi[indice];
        setTitolo(eventoDaModificare.titolo);
        setData(eventoDaModificare.data);
        setLuogo(eventoDaModificare.luogo);
        setCategoria(eventoDaModificare.categoria);
        setPrezzo(eventoDaModificare.prezzo);
        setIndiceModifica(eventoDaModificare.indice);
    }

    return (

        <div>
            <input type="text" value={titolo} placeholder="Inserisci titolo" onChange={(e) => setTitolo(e.target.value)} required />
            <input type="text" value={data} placeholder="Inserisci data" onChange={(e) => setData(e.target.value)} required/>
            <input type="text" value={luogo} placeholder="Inserisci luogo" onChange={(e) => setLuogo(e.target.value)} required/>
            <input type="text" value={categoria} placeholder="Inserisci categoria" onChange={(e) => setCategoria(e.target.value)} required/>
            <input type="number" value={prezzo} placeholder="Inserisci prezzo" onChange={(e) => setPrezzo(e.target.value)} required/>
            {modalitaModifica ?
                <button onClick={modificaEvento}>Aggiorna Evento</button>
                :
                <button onClick={aggiungiEvento}>Aggiungi Evento</button>
            }

            <table border="1" style={{"padding":"10px"}}>
                <thead>
                    <tr>
                        <th className="colore">Titolo</th>
                        <th className="colore">Data</th>
                        <th className="colore">Luogo</th>
                        <th className="colore">Categoria</th>
                        <th className="colore">Prezzo</th>
                        <th className="colore">Azione</th>
                    </tr>
                </thead>
                <tbody>
                    {eventi.map((evento,indice) => (
                        <tr key={indice}>
                            <td>{evento.titolo}</td>
                            <td>{evento.data}</td>
                            <td>{evento.luogo}</td>
                            <td>{evento.categoria}</td>
                            <td>{evento.prezzo}</td>
                            <td>
                                <button onClick={() => modificaEvento(indice)}>Modifica</button>
                                <button onClick={() => eliminaEvento(indice)}>Elimina</button>
                           </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}