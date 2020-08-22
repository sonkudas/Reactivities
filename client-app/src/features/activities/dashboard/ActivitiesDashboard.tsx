
import React, { SyntheticEvent } from 'react'
import { Grid } from 'semantic-ui-react'
import { IActivity } from '../../../app/layout/models/activity'
import { ActivityList } from './ActivityList'
import { ActivityDetails } from '../details/ActivityDetails'
import { Activityform } from '../forms/Activityform'
import { SyntheticEventData } from 'react-dom/test-utils'

interface IProps{
    activities :IActivity[];
    selectActivity :(id: string)=> void;
    selectedActivity : IActivity|null;
    editmode : boolean;
    setEditMode :(editmode:boolean)=> void;
    setSelectedActivity :(activity :IActivity| null)=> void;
    createActivity :(activity:IActivity)=> void;
    editActivity :(activity:IActivity)=> void;
    deleteActivity : (event:SyntheticEvent<HTMLButtonElement>, id:string)=> void;
    submitting : boolean;
    target : string ;

}

export const ActivitiesDashboard : React.FC<IProps> = ({
    activities,
    selectActivity,
    selectedActivity,
    editmode,
    setEditMode,
    setSelectedActivity,
    createActivity,
    editActivity,
    deleteActivity,
    submitting,
    target
}) => {
    return (
        <div>
           <Grid>
               <Grid.Column width={10}> 
            <ActivityList activities={activities} selectActivity={selectActivity!} 
           deleteActivity={deleteActivity}
           submitting={submitting} target={target} />
               </Grid.Column>
               <Grid.Column width={6}> 
           {selectActivity &&!editmode&& (<ActivityDetails 
           activity={selectedActivity!}
            setEditMode={setEditMode}
            setSelectedActivity={setSelectedActivity}
            />)}
           {editmode && <Activityform  key={selectedActivity && selectedActivity.id||0}  setEditMode={setEditMode}  activity={selectedActivity!}
           createActivity={createActivity} editActivity={editActivity}  submitting={submitting}
            />}
               </Grid.Column>
           </Grid>
            
        </div>
    )
}
