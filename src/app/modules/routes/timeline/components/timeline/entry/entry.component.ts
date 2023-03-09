import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
//import { Entry } from '../../classes/entry/entry';
//import { Person } from '../../classes/person';
//import { Reference } from '@angular/compiler/src/render3/r3_ast';
import { IActor, IActorName, IActors, IDate, IEntry } from 'src/app/interfaces/timeline';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
	selector: 'entry',
	templateUrl: './entry.component.html',
	styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {
	@Input() item: IEntry;
	@Input() references: IActors;//Array<Reference>;
	@Input() locations;
	@Input() date: IDate;
	@Input() timelineSlug: string;
	@Input() isBeingReordered: boolean;

	elements: any[];
	isBeingEdited: boolean = false;

	ngOnInit(): void {
		this.elements = new Array();

		this.mapDescription();

		this.sidebarService.change.subscribe((eventData: any) => {
			if (eventData.isOpen === false) {
				this.isBeingEdited = false;
			}
		});
	}

	constructor(private sidebarService: SidebarService) {
	}

	private mapDescription() {
		let description: string = this.item.description;

		let currentDate: IDate = {
			era: this.date.era,
			year: this.date.year,
			month: this.date.month,
			day: this.date.day,
			exactness: this.date.exactness
		}

		while (description.includes("{")) {
			//this.elements.push( {type: 'text', description: description} );


			let startIndex: number = 0,
				refStartIndex: number = description.search("{"),
				refEndIndex: number = description.search("}"),
				beforeRefString: string = description.substring(startIndex, refStartIndex),
				rawReferenceString: string = description.substring(refStartIndex, refEndIndex + 1),
				afterRefString: string = description.substring(refEndIndex + 1, description.length + 1),
				actor = this.transformToReference(rawReferenceString, this.references);	

			description = afterRefString;
			if (beforeRefString) {
				this.elements.push({
					description: beforeRefString,
					type: 'text'
				});
			}

			if (actor) {
				let birthDate =  {
					era: actor.birthDate.era,
					year: actor.birthDate.year,
					month: actor.birthDate.month,
					day: actor.birthDate.day,
					exactness: actor.birthDate.exactness
				}

				//let timelineSlug: string = rawTimeline.slug;

				let name: string;
				if (actor.settings?.overrideName) {
					name = actor.settings.overrideName;
				}
				// TODO: Handle names correctly when database always have multiple names
				// else if (actor.names.length > 0) {
				// 	name = this.getActorName(currentDate, actor.names)
				// }
				else {
					name = `${actor.firstName} ${actor.lastName}`;
				}

				this.elements.push({
					type: 'character',
					//name: actor.settings?.overrideName ? actor.settings.overrideName : actor.firstName + " " + actor.lastName,
					//name: actor.settings?.overrideName ? actor.settings.overrideName : this.getActorName(currentDate, actor.names),
					name: name,
					image: actor.image,
					coverImage: actor.coverImage,
					age: this.getRefenceAge(currentDate, birthDate),
					showAge: actor.settings && 'showAge' in actor.settings ? actor.settings.showAge : true,
					//title: this.getActorTitle(currentDate, actor.titles),
					url: `/timeline/${this.timelineSlug}/${actor.slug}`
				});
			}
		}

		if (description) {
			this.elements.push({
				description: description,
				type: 'text'
			});
		}
	}

	private transformToReference(rawString: string, references: any): IActor {
		let cleanString = rawString.substring(1, rawString.length - 1),
			splittedString = cleanString.split('-'),
			referenceType = splittedString[0],
			settingsRawString = splittedString[1].split('|'),
			referenceIndex = parseInt(settingsRawString[0]),
			actor: IActor;
			//referenceSettings: IActorSettings;

		if (settingsRawString[1]) {
			//referenceSettings = this.extractCharacterSettings(settingsRawString[1]);
		}

		switch(referenceType) {
			case 'char':
				actor = references.find(x => x.id == referenceIndex);
				//actor.settings = referenceSettings;
				break;
			case 'location': 
				console.warn('Locations not supported yet');
		}
		return actor;
	}

	getActorName(currenDate: IDate, names: IActorName[]): string {
		let result: string = 'No name given (#)';
		
		if (names.length === 0) {
			return result;
		}

		names.forEach(name => {
			let isValidDate = this.validateDate(name.startDate, name.endDate, currenDate);


			if (isValidDate) {
				result = `${name.firstName} ${name.lastName}`;
				return;
			}

			/*
			if (this.validateDate(name.startDate, name.endDate, currenDate)) {
				result = `${name.firstName} ${name.lastName}`;
				return;
			}
			*/
		});

		//result = 'No valid name for date found';

		return result;
		//return "No valid name for date found";
		//return `${names[0]?.firstName} ${names[0]?.lastName}`;
	}

	getRefenceAge(currentDate, birthDate) {
		/* TODO: Return as object like the following:

			{
				yearsOld: X,
				monthsOld: Y,
				daysOld: Z,
				accucary: ['unknown','circa','exact']
			}

			All number values can be null
		*/

		let ageInYears: number = -1;

		if (!birthDate.year || birthDate.year == 0) {
			return "Age unknown";
		}

		if (currentDate.id == birthDate.id) {
			ageInYears = (currentDate.year - birthDate.year);
		}
		return ageInYears + " years old";
	}

	private validateDate(startDate: IDate, endDate: IDate, currentDate: IDate): boolean {
		let isStartDateValid = false,
			isEndDateValid = false;

		if (!startDate.startable) {
			// if not startable, it is 'since forever'
			isStartDateValid = true;
		}
		else {
			// date is not 'since forever'

			//if (startDate.era === currentDate.era) {
				if (startDate.year === currentDate.year) {
					if (startDate.month === currentDate.month) {
						if (startDate.day === currentDate.day) {
							isStartDateValid = true;
						}
						else if (startDate.day < currentDate.day) {
							isStartDateValid = true;
						}
					}
					else if (startDate.month < currentDate.month) {
						isStartDateValid = true;
					}
				}
				else if (startDate.year < currentDate.year) {
					isStartDateValid = true;
				}
			/*}
			else {
				// TODO: Eras before
				//debugger;
			}*/
		}

		if (!endDate.expirable) {
			// if not expirable, the date cannot end
			isEndDateValid = true;
		}
		else {
			// date can expire

			if (endDate.year === currentDate.year) {
				if (endDate.month === currentDate.month) {
					if (endDate.day === currentDate.day) {
						isEndDateValid = true;
					}
					else if (endDate.day > currentDate.day) {
						isEndDateValid = true;
					}
				}
				else if (endDate.month > currentDate.month) {
					isEndDateValid = true;
				}
			}

			if (endDate.year > currentDate.year) {
				isEndDateValid = true;
			}
		}

		//isEndDateValid = true; //TODO: just testing
		return (isStartDateValid && isEndDateValid);
	}

	onEditBtnClick() {
		this.isBeingEdited = !this.isBeingEdited;

		if (this.isBeingEdited) {
			this.sidebarService.openSidebarPage('event-edit');
		}
		else {
			this.sidebarService.close();
		}
	}
}
