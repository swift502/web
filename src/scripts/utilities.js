import projectIndex from '/src/data/project-index.yml';

export async function getProjects()
{
	// Data
	let projects = [];
	const dataFiles = import.meta.glob('/src/data/projects/*.yml');

	// Iterate
	for (let i = 0; i < projectIndex.length; i++)
	{
		const projectName = projectIndex[i];
		const dataPath = `/src/data/projects/${projectName}.yml`;

		if (dataPath in dataFiles)
		{
			projects.push({
				'name': projectName,
				'data': await dataFiles[dataPath](),
			});
		}
		else
		{
			logError(`Data file not found for project "${projectName}"`);
		}
	}

	return projects;
}

export function constructPageTitle(pageInfo)
{
	if ('title' in pageInfo)
	{
		return pageInfo['title'];
	}
	else
	{
		let pageTitle = 'Jan Bláha';
		if ('titlePrepend' in pageInfo) pageTitle = `${pageInfo['titlePrepend']} - ${pageTitle}`;
		if ('titleAppend' in pageInfo) pageTitle = `${pageTitle} - ${pageInfo['titleAppend']}`;

		return pageTitle;
	}
}

export function logError(message)
{
	console.error(`\u001b[91m${message}\u001b[0m`);
}

export function extractFilename(path)
{
	return path.match(String.raw`[^\/]+(?=\.\w+$)`)[0];
}

export function getRandomInt(min, max)
{
	return Math.floor(Math.random() * (max - min + 1) + min);
}
