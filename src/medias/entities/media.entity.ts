export class Media {

    private id: number;
    private title: string;
    private username: string;

    constructor(id: number, title: string, username: string){
        
      this.id = id;
      this.title = title;
      this.username = username;
    }

    getTitle(): string {
        return this.title;
      }

      getUsername(): string {
        return this.username;
      }

      getId(): number {
        return this.id;
      }
}
