import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { userInfo } from './graphql/UserSession.js';

import Settings from './pages/Settings.js';
import Dashboard from './pages/Dashboard.js';
import Organization from './pages/Organization.js';
import Issues from './pages/Issues.js';
import DetailsIssue from './pages/DetailsIssue';
import Projects from './pages/Projects.js';
import DetailsProject from './pages/DetailsProject.js';
import TopBar from './components/TopBar.js';
import Login from './pages/Login.js';
import './css/tailwind.css';
import Subsription from './pages/Subscription.js';
import Layout from './components/Layout.js';
import MobileBar from './components/MobileBar.js';

const App = () => {
	const { data, refetch } = useQuery(userInfo);
	
	const isMobile = window.innerWidth <= 1024;

	return <div className="w-full">
		{!data ? (
			<>
				<Route exact path="/">
					<Login onLoginSuccess={refetch} />
				</Route>
				<Route exact path="/subscription">
					<Subsription />
				</Route>
			</>
		) : (
			<>
				{isMobile
					? <MobileBar/>
					: <TopBar/>
				}
				<Layout>
					<Switch>
						<Route exact path="/">
							<Dashboard actualUser={data.userInfo} isMobile={isMobile}/>
						</Route>
						<Route path="/organization">
							<Organization isMobile={isMobile}/>
						</Route>
						<Route path="/projects">
							<Projects isMobile={isMobile}/>
						</Route>
						<Route path="/detailsProject/:id" children={<DetailsProject actualUser={data.userInfo}/>}/>
						<Route path="/issuesProject">
							<Issues isMobile={isMobile}/>
						</Route>
						<Route path="/issue/:id" children={<DetailsIssue/>}/>
						<Route path="/settings">
							<Settings isMobile={isMobile}/>
						</Route>
					</Switch>
				</Layout>
			</>
		)}
	</div>;
};
export default App;
