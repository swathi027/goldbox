import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { ApiService } from "src/app/api.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { Toast, ToastrService } from "ngx-toastr";
import { CategoryService } from "src/app/shared/category.service";
declare var $: any; // Declare jQuery

@Component({
  selector: "app-category-list",
  templateUrl: "./category-list.component.html",
  styleUrls: ["./category-list.component.scss"],
})
export class CategoryListComponent {
  initChecked = false;
  ischecked = true;

  // pagination variables
  public pageSize = 10;
  public totalData = 0;
  showFilter = false;

  public searchDataValue = "";
  public initialresponse: any;
  tableData: any;
  page: any;
  searchText: any;
  postdata: FormGroup;
  selectedfile: any;
  form: any;
  imageSrc: string | undefined;
  image_uri: any;
  category: any;
  status: any;
  editform: any;
  editor: any;
  editdata: any;
  finalurl: any;
  submitted = false;
  selectedfile1: any;

  constructor(
    private api: ApiService,
    private router: Router,
    private toas: ToastrService,
    private formBuilder: FormBuilder,
    private categery: CategoryService
  ) {
    this.postdata = this.formBuilder.group({
      name: ["", Validators.required],
      image: ["", Validators.required],
    });

    this.editform = this.formBuilder.group({
      name: ["", Validators.required],
      image: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.categorylist();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.postdata.controls;
  }

  //Category List
  categorylist() {
    this.api.get(`/ecom/categories?page=${this.page}`).subscribe((res: any) => {
      this.tableData = res.message;
    });
  }

  //Update category
  updatecategorystatus(table: any) {
    this.api.post(`/ecom/categories/${table.id}`, table).subscribe(
      (res: any) => {
        this.toas.success("Category Updated Successfully");
        this.categorylist(); // Assuming you have a method to refresh the categories list
      },
      (error) => {
        console.error("Error Updating Category:", error);
      }
    );
  }

  //image validation//
  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      // Check if the file extension is jpg, jpeg, or png
      const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      if (!allowedExtensions.test(file.name)) {
        this.postdata.get("image")?.setValue(null);
        this.toas.error(
          "Selected file is not a valid image format (jpg, jpeg, png)."
        );
        return;
      }

      const maxSizeMB = 5;
      if (file.size > maxSizeMB * 1024 * 1024) {
        console.error("Selected file size exceeds the limit.");
        return;
      }

      this.selectedfile = file;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }
  }
  onFileChange1(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      // Check if the file extension is jpg, jpeg, or png
      const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      if (!allowedExtensions.test(file.name)) {
        this.editform.get("image")?.setValue(null);
        this.toas.error(
          "Selected file is not a valid image format (jpg, jpeg, png)."
        );
        return;
      }

      const maxSizeMB = 5;
      if (file.size > maxSizeMB * 1024 * 1024) {
        console.error("Selected file size exceeds the limit.");
        return;
      }

      this.selectedfile1 = file;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }
  }

  // post category
  onSubmit(): void {
    if (!this.selectedfile || this.postdata.invalid) {
      this.toas.error("All fields are required");
      return;
    }
    const postdata = new FormData();
    postdata.append("image_uri", this.selectedfile),
      postdata.append("catname", this.postdata.value.name);
    this.api.post("/ecom/categories", postdata).subscribe(
      (res: any) => {
        this.toas.success(res.message);
        this.postdata.reset();
        this.categorylist();
        $("#addcategory").modal("hide");
      },
      (error) => {
        this.toas.error(error.error.message);
      }
    );
  }

  // get single data
  singledata(id: any) {
    this.api.get(`/ecom/categories/${id}`).subscribe((res: any) => {
      this.editdata = res.message;
      // Assuming you have a FormGroup named 'editform'
      (this.imageSrc = this.editdata.image_uri),
        this.editform.patchValue({
          name: this.editdata.catname,
        });
    });
  }

  deletedata(id: number) {
    this.categery.deletecatagory(id).subscribe(
      (res) => {
        this.toas.success("Successfully Deleted")
        this.categorylist();
      },
      (err) => {
        this.toas.error(err.error.message)

      }
    );
  }

  // edit data posting
  editSubmit(): void {
    if (this.selectedfile1) {
      this.finalurl = this.selectedfile1;
    } else {
      this.finalurl = this.editdata.image_uri;
    }
    const editeddata = new FormData();
    editeddata.append("image_uri", this.finalurl);
    editeddata.append("catname", this.editform.get("name").value);

    this.api.post(`/ecom/categories/${this.editdata.id}`, editeddata).subscribe(
      (res: any) => {
        this.toas.success(res.message);
        this.editform.reset();
        this.categorylist();
        $("#editcategory").modal("hide");
      },
      (error) => {
        this.toas.error(error.error.message);
      }
    );
  }

  //Pagination
  pageChanged(pageNumber: number) {
    this.page = pageNumber;
    this.categorylist();
  }

  refresh() {
    this.postdata.reset();
    this.postdata.get("catname")?.reset();
  }


}
