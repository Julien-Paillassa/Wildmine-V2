import React, { useState } from 'react';
import { useQuery } from "@apollo/client";

import SearchButton from '../components/SearchButton';
import DisplayIssuesTitle from './components/issues/DisplayIssuesTitle';
import DisplayIssuesValues from './components/issues/DisplayIssuesValues';
import { userWithRelations } from '../graphql/UserSession';
import { NavLink } from 'react-router-dom';
import { getIssues } from '../graphql/Issue';

const Issues = () => {
	const { loading, data } = useQuery(userWithRelations);

  const { loading: loading1, data: data1 } = useQuery(getIssues);

  const [foundIssues, setFoundIssues] = useState([]);
  const [valuesToCompare, setValuesToCompare] = useState('');

  if (loading1) return <div className='mx-auto'>Chargement...</div>

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== '') {
      const results = data1.issues.filter((issue) => {
        return issue.name.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setFoundIssues(results);

    } else {
      setFoundIssues(data1.issues);
    }
    setValuesToCompare(keyword);
  };

  const filter1 = (e) => {
    const keyword = e.target.value;

    if (keyword !== '') {
      const results = data1.issues.filter((issue) => {
        return issue.project_name.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setFoundIssues(results);

    } else {
      setFoundIssues(data1.issues);
    }
    setValuesToCompare(keyword);
  };

  if (foundIssues.length === 0 && !valuesToCompare && data1.issues.length > 0) {
    setFoundIssues(data1.issues);
  }
  console.log(data1.issues)
  return <div>

      <SearchButton
        value={valuesToCompare}
        onChange={filter1}
      />

    <DisplayIssuesTitle/>

    <div>
      {data1.issues
      ? foundIssues.map((issue, issueIndex) => (
        <NavLink to={`/issue/${issue.id}`}>
          <DisplayIssuesValues key={issueIndex} issue={issue} issueIndex={issueIndex} issues={foundIssues}/>
        </NavLink>
      ))
    : <p className='text-xl font-bold'>Aucun ticket ne vous est assigné pour le moment</p>}
    </div>
  </div>;
};

export default Issues;