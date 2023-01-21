import React from 'react';

const DisplayIssuesValues = ({ issue, issueIndex, issues }) => {
  let priorityColor;
  let statusColor;

  const newDate = new Date(issue.created_at)

  if (issue.priority === 'HIGH') priorityColor = 'bg-issue_red'
  if (issue.priority === 'NORMAL') priorityColor = 'bg-issue_orange'
  if (issue.priority === 'LOW') priorityColor = 'bg-issue_green'

  if (issue.status === 'DONE') statusColor = 'bg-issue_green'
  if (issue.status === 'IN_PROGRESS') statusColor = 'bg-issue_orange'
  if (issue.status === 'IN_WAIT') statusColor = 'bg-issue_grey'



  return <div className={`grid grid-cols-7 p-4 text-xs sm:text-sm md:text-base bg-grey_light text-wildmine_black shadow-md text-center border relative -z-10 ${issueIndex === issues.length - 1 ? 'rounded-b-lg' : 'border-b-black'}`}>
    <div className='py-2 px-4 bg-wildmine_black rounded-lg mx-auto'>
      <p className='font-extrabold text-secondary_color'>#{issue.id}</p>
    </div>

    <div className={`${priorityColor} w-[25px] h-[25px] border rounded-full mx-auto`}/>

    <p>{issue.name}</p>

    <p className='italic'>{issue.project_name}</p>

    <p className='italic'>{`${issue.description.slice(0, 20)}...`}</p>

    <div className={`${statusColor} w-[25px] h-[25px] border rounded-full mx-auto`}/>

    <p className='italic'>{newDate.toLocaleDateString("fr")}</p>

  </div>;
};

export default DisplayIssuesValues;