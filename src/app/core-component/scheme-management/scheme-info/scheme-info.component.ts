import { Component, OnDestroy } from '@angular/core';
import { Editor } from 'ngx-editor';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $: any; // Declare jQuery
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-scheme-info',
  templateUrl: './scheme-info.component.html',
  styleUrls: ['./scheme-info.component.scss']
})
export class SchemeInfoComponent implements OnDestroy {
  schemeContentEditor: any;
  termsConditionsEditor: any;

  schemeContent: any;
  termsConditions: any;
  content: any;
  contentform: any;
  tcform: any;
tc: any;
  features: any;
page: any|1;
  postfeature: any;
  editfeature: any;
  faqs: any;
  featuresedit: any;
  postfaq: any;
  editfaqs: any;
  faqsingler: any;
  terms: any;
  maincontent: any;

   constructor(private fb: FormBuilder,private api:ApiService,private router: ActivatedRoute,private toas:ToastrService){

    // content form
    this.contentform = this.fb.group({
      content: ['', Validators.required]
    });
    // content form
    this.tcform = this.fb.group({
      tc: ['', Validators.required]
    });
    // FAQ form
    // FAQ form
    this.postfaq = this.fb.group({
      questions: ['', Validators.required],
      answers: ['', Validators.required]
    });
    this.editfaqs = this.fb.group({
      questions: ['', Validators.required],
      answers: ['', Validators.required]
    });
   
    // Featires form
    this.postfeature = this.fb.group({
      features: ['', Validators.required],
      explanation: ['', Validators.required]
    });
    this.editfeature = this.fb.group({
      features: ['', Validators.required],
      explanation: ['', Validators.required]
    });
   }
  ngOnInit(): void {
    this.schemeContentEditor = new Editor();
    this.termsConditionsEditor = new Editor();
    this.schemecontent();
    this.schemetc();
    this.getfeatures();
    this. getfaqs()
  }

  // make sure to destroy the editors
  ngOnDestroy(): void {
    if (this.schemeContentEditor) {
      this.schemeContentEditor.destroy();
    }
    if (this.termsConditionsEditor) {
      this.termsConditionsEditor.destroy();
    }
  }

// get content
  schemecontent(){
    const scheme_id = this.router.snapshot.paramMap.get('id');
    this.api.get(`/schemes/content/list/${scheme_id}`).subscribe((res:any)=>{
      this.maincontent=res.message
      this.content=res.message[0].content;
    })
  }
  // Add and update content
  updatecontent(){
      const scheme_id = this.router.snapshot.paramMap.get('id');
      const data={
        content_type:2,
        content:this.contentform.get('content').value
      }
     if(this.content){
      this.api.post(`/schemes/content/update/${this.maincontent[0].id}`,data).subscribe((res:any)=>{
        this.schemecontent()
        this.toas.success(res.message)
      },err=>{
        this.toas.error(err.error.message)
        })
     }else{
      this.api.post(`/schemes/content/add/${scheme_id }`,data).subscribe((res:any)=>{
        this. schemecontent()
        this.toas.success(res.message)
      },err=>{
        this.toas.error(err.error.message)
        })
     }
  }

  
// get tc
  schemetc(){
    const scheme_id = this.router.snapshot.paramMap.get('id');
    this.api.get(`/schemes/tc/list/${scheme_id}`).subscribe((res:any)=>{
      this.terms=res.message
      this.tc=res.message[0].tc;
    
    })
  }
  // Add and update tc
  updatetc(){
      const scheme_id = this.router.snapshot.paramMap.get('id');
      const data={
        tc:this.tcform.get('tc').value
      }
     if(this.tc){
      this.api.post(`/schemes/tc/update/${this.terms[0].id}`,data).subscribe((res:any)=>{
        this.schemetc()
        this.toas.success(res.message)
      },err=>{
        this.toas.error(err.error.message)
        })
     }else{
      this.api.post(`/schemes/tc/add/${scheme_id}`,data).subscribe((res:any)=>{
        this.schemetc()
        this.toas.success(res.message)
      },err=>{
        this.toas.error(err.error.message)
        })
     }
  }

  // getFeatures
  getfeatures(){
    const scheme_id = this.router.snapshot.paramMap.get('id');
    this.api.get(`/schemes/features/list/${scheme_id}`).subscribe((res:any)=>{
      this.features=res.message;

    })
  }
  // get single feature
  singlefeature(id:any){
    this.api.get(`/schemes/features/${id}`).subscribe((res:any)=>{
      this.featuresedit=res.message;
      this.editfeature.patchValue({
        features: this.featuresedit.features,
        explanation: this.featuresedit.explanation,

      });
    })
  }
  // post features
  addfeature(){
    const scheme_id = this.router.snapshot.paramMap.get('id');
    this.api.post(`/schemes/features/add/${scheme_id }`,this.postfeature.value).subscribe((res:any)=>{
      this.getfeatures()
      this.postfeature.reset()
      this.toas.success(res.message)
    },err=>{
      this.toas.error(err.error.message)
      })
  }
  // edit feature
  editfeatures(){

    this.api.post(`/schemes/features/update/${this.featuresedit.id}`,this.editfeature.value).subscribe((res:any)=>{
      this.getfeatures()
      this.postfeature.reset()
      this.toas.success(res.message)
    },err=>{
      this.toas.error(err.error.message)
      })
  }
  // delete feature
  deletefeature(id:any){
    this.api.delete(`/schemes/features/delete/${id}`).subscribe((res:any)=>{
      this.toas.success(res.message)
      this.getfeatures()
    },err=>{
      this.toas.error(err.error.message)
      })
  }

  // get faq
  getfaqs(){
    const scheme_id = this.router.snapshot.paramMap.get('id');
    this.api.get(`/schemes/faqs/list/${scheme_id}`).subscribe((res:any)=>{
      this.faqs=res.message;

    })
  }
  // get single FAQ
  singlefaq(id:any){
    this.api.get(`/schemes/faqs/${id}`).subscribe((res:any)=>{
      this.faqsingler=res.message;
      this.editfaqs.patchValue({
        questions: this.faqsingler.questions,
        answers: this.faqsingler.answers,
      });

    })
  }
  // post faq
  addfaq(){
    const scheme_id = this.router.snapshot.paramMap.get('id');
    this.api.post(`/schemes/faqs/add/${scheme_id }`,this.postfaq.value).subscribe((res:any)=>{
      this.getfaqs()
      this.postfaq.reset()
      this.toas.success(res.message)
    },err=>{
      this.toas.error(err.error.message)
      })
  }
  // edit faq
  editfaq(){
    this.api.post(`/schemes/faqs/update/${this.faqsingler.id}`,this.editfaqs.value).subscribe((res:any)=>{
      this.getfaqs()
      this.editfaqs.reset()
      this.toas.success(res.message)
    },err=>{
      this.toas.error(err.error.message)
      })
  }
  // delete faq
  deletfaq(id:any){
    this.api.delete(`/schemes/faqs/delete/${id}`).subscribe((res:any)=>{
      this.getfaqs()
      this.toas.success(res.message)
    },err=>{
      this.toas.error(err.error.message)
      })
  }

// pagenamtion
pageChanged(pageNumber: number) {
  this.page = pageNumber;
  this.getfeatures();
}
pageChanged1(pageNumber: number) {
  this.page = pageNumber;
  this.getfaqs();
}

// refresh
refresh(){
  this.postfaq.reset();
  this.postfeature.reset();
}
}
