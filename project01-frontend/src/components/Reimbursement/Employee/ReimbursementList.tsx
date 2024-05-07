
export const ReimbursementList:React.FC = (reimbs) => {

    return (
        <div>
            <div>
                <span>description</span>
                <span>amount</span>
                <span>date</span>
                <span>status</span>
                <span>operations</span>
            </div>
            <div>
                {
                    // reimbs.map((r:any) => <li key={r.reimbId}>
                    //     <span>{r.description}</span>
                    //     <span>{r.amount}</span>
                    //     <span>{r.date.substr(0,10)}</span>
                    //     <span>{r.status}</span>
                    //     <button>Update</button>
                    //     <button>Delete</button>
                    // </li>)
                }
            </div>
        </div>
    )
}