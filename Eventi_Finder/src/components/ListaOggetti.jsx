import './ListaOggetti.css';
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
        const nuovoUtente = {
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
        setIndiceModifica("");
    }

    function eliminaEvento(index) {

        if(window.confirm("Sei sicuro di eliminare questo evento?")) {
            setEventi(arrayPrecedentementeSalvato => arrayPrecedentementeSalvato.filter((_,i) => i !== index));
        }
    }

    /* carico i dati, provenienti dal LS, negli input */

    function modificaEvento(indice) {
        setModalitaModifica(true);
        const utenteDaModificare = eventi[indice];
        setTitolo(eventoDaModificare.titolo);
        setData(eventoDaModificare.data);
        setLuogo(eventoDaModificare.luogo);
        setCategoria(eventoDaModificare.categoria);
        setIndiceModifica(indice);
    }

    return (

        <div>
            <input type="text" value={titolo} placeholder="Inserisci titolo" onChange={(e) => setTitolo(e.target.value)} required />
            <input type="text" value={data} placeholder="Inserisci data" onChange={(e) => setData(e.target.value)} required/>
            <input type="text" value={residenza} placeholder="Inserisci residenza" onChange={(e) => setResidenza(e.target.value)} required/>
            <input type="number" value={eta} placeholder="Inserisci età" onChange={(e) => setEta(e.target.value)} required/>
            {modalitaModifica ?
                <button onClick={aggiungiUtente}>Aggiorna utente</button>
                :
                <button onClick={aggiungiUtente}>Aggiungi utente</button>
            }

            <table border="1" style={{"padding":"10px"}}>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Cognome</th>
                        <th>Residenza</th>
                        <th>Età</th>
                        <th>Azioni</th>
                    </tr>
                </thead>
                <tbody>
                    {utenti.map((utente,indice) => (
                        <tr key={indice}>
                            <td>{utente.nome}</td>
                            <td>{utente.cognome}</td>
                            <td>{utente.residenza}</td>
                            <td>{utente.eta}</td>
                            <td>
                                <button onClick={() => modificaUtente(indice)}>Modifica</button>
                                <button onClick={() => eliminaUtente(indice)}>Elimina</button>
                           </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}