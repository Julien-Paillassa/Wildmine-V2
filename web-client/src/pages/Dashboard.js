import React from 'react';
import diagram from '../assets/images/diagram.png';
import { useQuery } from "@apollo/client";
import { userWithRelations } from '../graphql/UserSession';
import { NavLink } from 'react-router-dom';
import DisplayIssuesTitle from './components/issues/DisplayIssuesTitle';
import DisplayIssuesValues from './components/issues/DisplayIssuesValues';

const Dashboard = ({ actualUser }) => {
	const { loading, error } = useQuery(userWithRelations);
	// Les datas sont là pour toi Clara :D

	if (loading) return 'Loading...';

	if (error) return `Error! ${error.message}`;

	console.log(actualUser.issues_assigned)
	return (
		<div className="dashboard-container">
			{actualUser ? (
				<>
					<div className="grid grid-cols-3 gap-6">
						<div className="col-span-1">
							<div className="max-w-sm rounded overflow-hidden shadow-lg bg-secondary_color columns-2">
								<img className="w-full" src={diagram} alt="diagram" />
								<div className="px-6 py-4">
									<div className="grid grid-cols-2 mt-6 mb-6">
										<p className="text_color_light">
											Vous pourez bient dans la version 2.0 de WildMine voir l'avancement des diverses projets
											dans ce graphique camanbert, ainsi que des prévisions sur les deadline de projet.
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="col-span-2">
							<p className="font-bold text-xl mb-2 text_color_light font-chaney divide-y divide-solid">
								Projets auxquels je suis rattaché
							</p>
							
							<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
							{actualUser.project_assigned 
								? actualUser.project_assigned.map((project) => {
									return <table className="w-full text-sm border text-left text-gray-500 dark:text-gray-400">
										<thead className="text-xs text-wildmine_black uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
											<tr>
												<th scope="col" className="px-6 py-3">
													Projet
												</th>
												<th scope="col" className="px-6 py-3">
													Description
												</th>
												<th scope="col" className="px-6 py-3">
													Date
												</th>
												<th scope="col" className="px-6 py-3">
													En cours
												</th>
											</tr>
										</thead>
										<tbody>
										
											<tr className="text-text_color_light border-b dark:bg-gray-800 dark:border-gray-700">
											<NavLink to={"/detailsProject/" + project.id }>
												<th scope="row" className="px-6 py-4 font-medium dark:text-white whitespace-nowrap">
													{project.name}
												</th>
											</NavLink>
												<td className="px-6 py-4">{project.description}</td>
												<td className="px-6 py-4">{new Date(project.created_at).toLocaleDateString("fr")}</td>
												{actualUser.issues_assigned 
													? <td className="px-6 py-4">Oui</td>
													: <td className="px-6 py-4">Non</td>
												}
												
											</tr>
										
										</tbody>
									</table>
									})
								: <p>Aucun projet pour le moment</p>
							}
							</div>
						</div>
						<div className="col-span-3">
							<p className="font-bold text-xl text_color_light mt-8 mb-12 font-chaney">Derniers tickets traités</p>
							{actualUser.issues_assigned.length > 0
          ? <div>
              <DisplayIssuesTitle/>
              <div>
                {actualUser.issues_assigned
                  ? actualUser.issues_assigned.map((issue) => (
					issue.status === 'DONE'
						? <NavLink to={`/issue/${issue.id}`}>
						<DisplayIssuesValues  issue={issue} issues={actualUser}/>
						</NavLink>
						: ''
                  ))
                  : <p className='text-xl font-bold'>Aucun ticket ne vous est assigné pour le moment</p>
                }
              </div> 
            </div>
            // <div>
            //   <Issues issues={actualUser.issues_assigned }/>
            // </div>
          : <p className='mx-auto text-xl font-bold tracking-wide py-20'>Aucun ticket ne vous est assigné</p>
        }
						</div>
					</div>
					{/* </div> */}
				</>
			) : (
				<>''</>
			)}
		</div>
	);
};

export default Dashboard;
