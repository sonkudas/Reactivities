import React, { useState, useEffect, SyntheticEvent } from "react";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { IActivity } from "./models/activity";
import NavBar from "../../features/nav/NavBar";
import { ActivitiesDashboard } from "../../features/activities/dashboard/ActivitiesDashboard";
import agent from "../api/agent";
import { LoadingComponent } from "./LoadingComponent";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editmode , setEditMode] = useState(false);
  const [loading,setLoading] =useState(true);
  const [submitting,setSubmittimg] =useState(false);
  const [target,setTarget] = useState('');
  //const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  
  const handleCreateActivity =(activity : IActivity)=>{
    setSubmittimg(true);
    agent.Activities.create(activity).then(()=>{
      setActivities([...activities , activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(()=> setSubmittimg(false));
     
  }

  const handleEditActivity =(activity : IActivity)=>{
    setSubmittimg(true);
    agent.Activities.update(activity).then(()=>{
      setActivities([...activities.filter(a=> a.id !==activity.id) , activity]);
    setSelectedActivity(activity);
    setEditMode(false);
    }).then(()=>setSubmittimg(false))
    
}

const handleDeleteActivity =(event :SyntheticEvent<HTMLButtonElement>, id : string)=>{
  setSubmittimg(true);
  setTarget(event.currentTarget.name)
  agent.Activities.delete(id).then(()=>{
    setActivities([...activities.filter(a=> a.id !==id)]);
    setEditMode(false);
  }).then(()=> setSubmittimg(false))
 
}

  const handleSelectedActivity =(id: string) =>{
    setSelectedActivity ( activities.filter(a=>a.id===id)[0]);
  }

  const handleOpenCreateForm=()=>
  {
    setSelectedActivity(null);
    setEditMode(true);
  }

  useEffect(() => {
    agent.Activities.list() 
      .then(response => {
        let activities : IActivity[]=[];
        response.forEach((activity)=>{
          activity.date = activity.date.split('.')[0];
          activities.push(activity);
        })
        setActivities(response);
      }).then(()=>setLoading(false));
  }, []);
  if(loading) return <LoadingComponent content='loading component ...'/>
  return (
    <div>
      <NavBar openCreateForm={handleOpenCreateForm}/>
      <Container style={{marginTop:'6em'}}  >
      <ActivitiesDashboard activities={activities} 
       selectActivity={handleSelectedActivity}
       selectedActivity={selectedActivity}
       editmode={editmode}
       setEditMode={setEditMode}
       setSelectedActivity={setSelectedActivity}
       createActivity={handleCreateActivity}
       editActivity={handleEditActivity}
       deleteActivity={handleDeleteActivity}
       submitting={submitting}
       target={target}

      >

      </ActivitiesDashboard>
      </Container>
    </div>
  );
};

export default App;
