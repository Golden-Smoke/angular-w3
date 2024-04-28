import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

type Note = {
    title: string,
    description: string
}

@Component({
    selector:'app-notes',
    templateUrl:'./notes.component.html',
    styleUrl:'./notes.component.scss',
    imports:[FormsModule],
    standalone:true
})
export class NotesComponent {
    public index: null | number = null;
    public noteTitle = '';
    public noteDescription = '';

    public notes: Note[] = [];

    public minimumTitleLength = 5;
    public minimumDescriptionLength = 7;

    public saveNote(event: SubmitEvent) {
        event.preventDefault();
        if (this.noteTitle.length < this.minimumTitleLength || 
            this.noteDescription.length < this.minimumDescriptionLength) {
                alert("Please enter valid values!");
                return;
        }
        
        if(this.index != null) {
            this.notes[this.index].title = this.noteTitle;
            this.notes[this.index].description = this.noteDescription;

            this.index = null;
        }
        else {
            const note: Note = {
                title: this.noteTitle,
                description:this.noteDescription
            }
            this.notes.push(note);
        }
        this.noteTitle = '';
        this.noteDescription = '';
    }
    public setActiveNote(index: number | null) {
        this.index = index;

        if(this.index != null) {
            this.noteTitle = this.notes[this.index].title;
            this.noteDescription = this.notes[this.index].description;
        }
    }

    public deleteNote(index: number | null) {
        if(index != null) this.notes.splice(index,1)
    }

    public validateField(field: string, length: number) : string {
        if(field.length >= length) return "valid"
        else return "invalid"
    }
    public isNoteSelected(index: number) {
        if(index != null) {
            if(this.index === index) return "selected";
            else return '';
        }
        return '';
    }
}