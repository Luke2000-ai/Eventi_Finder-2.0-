import { useState, useEffect } from "react";

// import './ListaOggetti.css';
export default function ListaOggetti() {
    const NOME_LISTA = "eventi";
    // USE STATE
    const [eventi, setEventi] = useState(() => {
        const eventiSalvati = localStorage.getItem(NOME_LISTA);
        return eventiSalvati ? JSON.parse(eventiSalvati) : [];  
    });
    const [eventiCercati, setEventiCercati] = useState([])
    const [titolo,setTitolo] = useState("");
    const [data,setData] = useState("");
    const [luogo,setLuogo] = useState("");
    const [categoria,setCategoria] = useState("");
    const [prezzo, setPrezzo] = useState("");
    const [modalitaModifica, setModalitaModifica] = useState(false);
    const [indiceModifica, setIndiceModifica] = useState("");

    // USE EFFECT

    useEffect(() => {
        localStorage.setItem(NOME_LISTA, JSON.stringify(eventi));
        setEventiCercati(eventi);
    },[eventi]);

    function aggiungiEvento() {
        if(!titolo.trim() || !data.trim() || !luogo.trim() || !categoria.trim() || !prezzo) return; 
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
        pulisciCampi();
    }

    function cercaEvento() {     
        // console.log("titolo", titolo, "luogo", luogo, "prezzo", prezzo, "categoria", categoria, "data", data)
        let paolo = [];
        if(!titolo.trim() && !data.trim() && !luogo.trim() && !categoria.trim() && !prezzo){
            setEventiCercati(eventi);
        } else {
            paolo = (eventi.filter(e => e.titolo === titolo || e.luogo === luogo || e.prezzo == prezzo || e.categoria === categoria || e.data === data));
            console.log("eventiCercati", eventiCercati);
            setEventiCercati(paolo)
        }
        console.log("eventiCercati", eventiCercati)
        console.log("eventi", eventi)
        pulisciCampi();
    }
    

    function eliminaEvento(index) {
        if(window.confirm("Sei sicuro di eliminare questo evento?")) {
            const aggiornati = eventi.filter((_,i) => i !== index);
            setEventiCercati(aggiornati);
            setEventi(aggiornati);
            return(aggiornati);
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
        setIndiceModifica(indice);
    }
    
    function pulisciCampi(){
        setTitolo("");
        setData("");
        setLuogo("");
        setCategoria("");
        setPrezzo("");
    }

    return (
        <div className="tutto">
            <div className="row">
                <div className="col">
                    <div className="card p-3">
                        <input
                            type="text"
                            value={titolo}
                            placeholder="Inserisci titolo"
                            onChange={(e) => setTitolo(e.target.value)}
                            required
                            className="form-control mb-2"
                        />
                        <input
                          type="text"
                            value={data}
                            placeholder="Inserisci data"
                            onChange={(e) => setData(e.target.value)}
                            required
                            className="form-control mb-2"
                        />
                        <input
                            type="text"
                            value={luogo}
                            placeholder="Inserisci luogo"
                            onChange={(e) => setLuogo(e.target.value)}
                            required
                            className="form-control mb-2"
                        />
                        <input
                            type="text"
                            value={categoria}
                            placeholder="Inserisci categoria"
                            onChange={(e) => setCategoria(e.target.value)}
                            required
                            className="form-control mb-2"
                        />
                        <input
                            type="number"
                            value={prezzo}
                            placeholder="Inserisci prezzo"
                            onChange={(e) => setPrezzo(Number(e.target.value))}
                            required
                            className="form-control mb-3"
                        />
                        <button className="btn btn-primary" onClick={aggiungiEvento}>
                            {modalitaModifica ? 'Aggiorna Evento' : 'Aggiungi Evento'}
                        </button>
                        <br />
                        <button className="btn btn-primary" onClick={cercaEvento}>
                        Cerca Evento / Cerca Tutti
                        </button>
                    </div>
                </div>
                <div className="events ">
                {eventiCercati.map((e, indice) => (
                    <div className="card mb-3" style={{ width: '18rem' }} key={indice}>
                        <div className="card-body">
                            <h5 className="card-title">{e.titolo}</h5>
                            <p className="card-text">{e.data}</p>
                            <p className="card-text">{e.luogo}</p>
                            <p className="card-text">{e.categoria}</p>
                            <p className="card-text">{e.prezzo}</p>
                            <div>
                                <button className="btn btn-warning me-2" onClick={() => modificaEvento(indice)}>
                                    Modifica
                                </button>
                                <button className="btn btn-danger" onClick={() => eliminaEvento(indice)}>
                                    Elimina
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </div>

    );
}