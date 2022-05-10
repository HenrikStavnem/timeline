export enum YearExactnessType {
	millennium = 'millennium',
	century = 'century',
	decade = 'decade',
	before = 'before',
	circa = 'circa',
	exact = 'exact',
	after = 'after',
	unknown = 'unknown'
}

export enum ExactnessType {
	millennium = 'millennium',
	century = 'century',
	decade = 'decade',
	beforeYear = 'beforeYear',
	circa = 'circa',
	year = 'year',
	afterYear = 'afterYear',
	season = 'season',
	beforeMonth = 'beforeMonth',
	month = 'month',
	afterMonth = 'afterMonth',
	relative = 'relative',
	beforeDay = 'beforeDay',
	day = 'day',
	afterDay = 'afterDay'
}

// Maybe beforeDay, beforeMonth and beforeYear becomes 'before'. Same with after