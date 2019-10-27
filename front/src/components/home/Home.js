import React,{useState,useRef} from "react";
import "./Home.scss";

import ActionModal from "../actions/actionModal/ActionModal";
import "../actions/actionModal/ActionModal.scss";

import {useSelector} from "react-redux";


function Home() {
    const [isOpenModal,setIsOpenModal]=useState(false);
    const [newContest,setNewConstest]=useState({});
    const [errorMsg,setErrorMsg]=useState("");

    const newContestModal = useRef(null);

    const useActiveContests = () =>
      useSelector(state => state.contests.activeContests, []);
    const activeContests=useActiveContests();

    const data=activeContests?activeContests.map(el=><li>{el.name+" "+el.endDate}</li>):["nOTHING"]
    
    const createContest=()=>{

    }

    const modalFormBody=(
        <form className="home__modal">
            <div className="home__modal__row">
                <div className="home__modal__col">
                    <label>
                        Name
                        <input type="text"/>
                    </label>

                    <label>
                        Topic
                        <input type="text"/>
                    </label>
                </div>
                <div className="home__modal__col">
                    <label>
                        EndDate
                        <input type="date"/>
                    </label>

                    <label>
                        Images
                        <label>
                            <input type="radio" value="option1" checked={true} />
                            Option 1
                        </label>
                        <label>
                            <input type="radio" value="option1" checked={false} />
                            Option 2
                        </label>
                    </label>
                </div>
            </div>
            <div className="home__modal__row">
                {errorMsg ? <p className="modal__form__errorMsg">{errorMsg}</p> : null}
                <button className="home__button" onSubmit={()=>createContest()}>
                    <img className="home__img" src={require("../../assets/icons/logo.svg")}/>
                    NEW TOP IMAGE
                </button>
            </div>
        </form>
    );

    const deactivateModal=()=>{
        setNewConstest({
            name:"",
            type:"",
            endDate:null,
            images:[]
          });
      
          console.log("Deactivate?");
          setErrorMsg("");
          newContestModal.current.toggle();
    }

    return(
        <div className="home">
            <button className="home__button" onClick={()=>newContestModal.current.toggle()}>
                <img className="home__img" src={require("../../assets/icons/logo.svg")}/>
                NEW TOP IMAGE
            </button>


            <ActionModal ref={newContestModal}
                modalHeaderTitle="New Top Image"
                modalBody={modalFormBody}
                okCBK={() => {}}
                cancelCBK={()=>{deactivateModal();}}/>
        </div>
    )
}

export default Home;