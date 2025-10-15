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
    const [prezzo, setPrezzo] = useState("");
    const [modalitaModifica, setModalitaModifica] = useState(false);
    const [indiceModifica, setIndiceModifica] = useState("");

    // USE EFFECT

    useEffect(() => {
        localStorage.setItem(NOME_LISTA, JSON.stringify(eventi));
    },[eventi]);

    function aggiungiEvento() {
        if(!titolo.trim() || data.trim() || luogo.trim() || categoria.trim() || prezzo.trim()) return; //controllo? solo titolo?
        const nuovoEvento = {
            titolo: titolo.trim(),
            data: data.trim(),
            luogo: luogo.trim(),
            categoria: categoria.trim(),
            prezzo: Number(prezzo)
        };

        if(modalitaModifica) {
            setUtenti(arrayPrecedentementeSalvato =>
                arrayPrecedentementeSalvato.map((evento,indice) => (indice === indiceModifica) ? nuovoEvento : evento)
            );
            setModalitaModifica(false);
        } else {
            setUtenti(arrayPrecedentementeSalvato => [...arrayPrecedentementeSalvato, nuovoEvento]);
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
        setIndiceModifica(indice);
    }

    return (



        
        // setTitolo("");
        // setData("");
        // setLuogo("");
        // setCategoria("");
        // setPrezzo("");
        
        
        <div>
            <input type="text" value={titolo} placeholder="Inserisci titolo" onChange={(e) => setTitolo(e.target.value)} required />
            <input type="text" value={data} placeholder="Inserisci data" onChange={(e) => setData(e.target.value)} required/>
            <input type="text" value={luogo} placeholder="Inserisci luogo" onChange={(e) => setLuogo(e.target.value)} required/>
            <input type="number" value={categoria} placeholder="Inserisci categoria" onChange={(e) => setCategoria(e.target.value)} required/>
            <input type="number" value={prezzo} placeholder="Inserisci prezzo" onChange={(e) => setPrezzo(e.target.value)} required/>
            {modalitaModifica ?
                <button onClick={modificaEvento}>Aggiorna Evento</button>
                :
                <button onClick={aggiungiEvento}>Aggiungi Evento</button>
            }

            <table border="1" style={{"padding":"10px"}}>
                <thead>
                    <tr>
                        <th>Titolo</th>
                        <th>Data</th>
                        <th>Luogo</th>
                        <th>Categoria</th>
                        <th>Prezzo</th>
                    </tr>
                </thead>
                <tbody>
                    {utenti.map((evento,indice) => (
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