import { Pipe, PipeTransform } from '@angular/core';
import { IActor, IActors, IActorSettings, IDate } from '../interfaces/timeline';
import { Reference } from '../reference';

@Pipe({
	name: 'century'
})
/**
 * A pipe that transforms actor references in timeline entry texts into 
 */
export class CenturyPipe implements PipeTransform {
	

	transform(value: number): string {
		let centuryRawString: string = value.toString(),
			convertedString: string = centuryRawString.substring(0, centuryRawString.length - 2),
			century: number = parseInt(convertedString) + 1;
		return `${century}`;
	}

}
