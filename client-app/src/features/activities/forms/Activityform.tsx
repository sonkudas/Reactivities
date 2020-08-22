import React, { useState, FormEvent } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/layout/models/activity";
import {v4 as uuid} from 'uuid';

interface IProps {
  setEditMode: (editmode: boolean) => void;
  activity: IActivity;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
  submitting : boolean
}

export const Activityform: React.FC<IProps> = ({
  setEditMode,
  activity: initialFormState,
  createActivity,
  editActivity,
  submitting
}) => {
  const initilizeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        title: "",
        description: "",
        date: "",
        city: "",
        venue: "",
      };
    }
  };
  const [activity, setActivity] = useState<IActivity>(initialFormState);

  const handleSubmit = () => {
    if (undefined ===activity.id || activity.id.length === 0) {
        let newActivity = {
          ...activity,
          id: uuid()
        };
        createActivity(newActivity);
      } else {
        editActivity(activity);
      }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          placeholder="Title"
          name="title"
          onChange={handleInputChange}
          value={activity?.title}
        />
        <Form.TextArea
          rows={2}
          placeholder="Description"
          name="description"
          onChange={handleInputChange}
          value={activity?.description}
        />
        <Form.Input
          placeholder="Category"
          name="category"
          onChange={handleInputChange}
          value={activity?.category}
        />
        <Form.Input
          type="datetime-local"
          placeholder="Date"
          name="date"
          onChange={handleInputChange}
          value={activity?.date}
        />
        <Form.Input
          placeholder="City"
          name="city"
          onChange={handleInputChange}
          value={activity?.city}
        />
        <Form.Input
          placeholder="Vanue"
          name="vanue"
          onChange={handleInputChange}
          value={activity?.venue}
        />
        <Button positive content="Submit" type="submit" floated="right" />
        <Button
          content="Cancel"
          onClick={() => setEditMode(false)}
          type="button"
          floated="right"
        />
      </Form>
    </Segment>
  );
};
