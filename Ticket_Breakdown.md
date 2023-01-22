# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Functional requirement

1. A platform where user can book agents and there working shift
2. User should be able to track the number of working hours per agent by quarter.
   
### Technical requirement

1. There are 3 entities where data is recorded i.e., Facilities, Agents, and Shifts
2. `getShiftsByFacility`
   1. input: Facility.id
   2. output: all shifts worked that quarter, including agent's data assigned to each shift
3. `generateReport`
   1. input: getShiftsByFacility response
   2. output: PDF for Facility with the list of Shifts

### Assumption

1. 1 Agent only work for 1 Facility
### System Design

#### Lower level design: 

- Facilities
```js
class Facility {
  public id: 'string' // uuid
  public name: 'string'
}
```
- Agents
```js
class Agent {
  public id: 'string' // uuid
  public name: 'string'
  public facilityId: "string" // One to One Mapping
}
```
- Shifts
```js
class Shift {
  public id: 'string' // uuid
  public startDateTime: 'datetime'
  public endDateTime: 'datetime'
  public agentId: "string"
  public facilityId: "string"
}
```

### Problem Statement

- Adding the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.

### Task Details

1. Adding the `agentCode` field in the `Agent` entity.
   1. Implementation Details:
      1. If you are using relational database to store the data then you need to create a migration file to update the `Agent` table and add the `agentCode` field
         1. The `agentCode` will have condition like
            1. It is required field
            2. It can not be NULL
            3. It should be unique
            4. The `agentCode` starts with letter `A` and then have 5 numbers after it.
      2. If it's NoSQL then the add `agentCode` in `Agent` Collection
      3. Create `agentCodeGenerator` function to create the agent code by default.
   2. Estimated Efforts and Time: 20 min/person
   3. Acceptance criteria:
      1. The `agentCode` starts with letter `A` and then have 5 numbers after it.
      2. It is required field
      3. It can not be NULL
      4. t should be unique
      5. Should have test cases for the which include the agentCode in Agent entity
   4. Failure criteria:
      1. The `agentCode` is not present in the Agent entity
      2. The code is no unique or can be null

2. Facility should only be able to Add and update the `agentCode`
   1. Implementation Details:
      1. Create frontend for the user to update the agent code
      2. Create API to update the agent Code.
      3. Check if the User is facility member or not.
         1. if not then send 403 status code which message "You are not authorized to perform this action"
      4. Check if the user is authorized to perform the action or not
         1. if not then send 403 status code which message "You are not authorized to perform this action"
      5. The code should check for the validation
         1. In case of error give proper error message.
         2. else give success message - "Agent code updated successfully"
      6. In case if you are using serialization/Data transformation object(DTO) for API update the to add agent code 
   2. Estimated Efforts and Time: 1 hrs/person
   3. Acceptance criteria:
      1. Only Facility can update their agents code else throw error with proper message - You are not authorized to perform this action
      2. Agent can not add or update their own code else throw error with proper message - You are not authorized to perform this action
      3. On updating if there is any error user should be prompted with correct message
      4. On successfully update user should get success message - "Agent code updated successfully"
   4. Failure criteria:
      1. Unauthorized user is able to add or update the agent code
      2. User did not got the response on updatation
      3. Agent is able to change the agent code

3. Update the `getShiftsByFacility` function which also should include `agentCode` in response
   1. Implementation Details:
      1. All shifts worked that quarter, including agent's data assigned to each shift 
      2. update the code to include the agent code with agent data
   2. Estimated Efforts and Time: 30 min/person
   3. Acceptance criteria:
      1. The agent data should have the agent code field
   4. Failure criteria:
      1. The agent data in the shift does not have agent code field

4. Update the `generateReport` function which also should reflect the custom added `agentCode`
   1. Implementation Details:
      1. update the code to include the agent code
   2. Estimated Efforts and Time: 30 min
   3. Acceptance criteria:
      1. The report have the agent code 
   4. Failure criteria:
      1. The report does not have the agent code

### Time and Effort Estimation

#### Assumption
1. We only have one person who will be working on the frontend and backend changes and also do the testing and deployment

Development and Unit Testing Time: 3 hours for 1 person.
Integration Testing: 1 hour
Buffer time: 1 hour

Total Time estimated: 5 hours

### User facing Impact

1. New screen changed/added to add/update the agent code.
2. User not be able to see the user code in PDF reports
