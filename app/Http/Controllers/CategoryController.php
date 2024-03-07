<?php

namespace App\Http\Controllers;

use App\Models\Category;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;
use Illuminate\Support\Str;


class CategoryController extends Controller
{
    public function category(){
        return view('Backend.Layout');
    }

    public function add(){
        return view('Backend.Layout');
    }

    protected function createCategoryURL($request){
        $slug = Str::slug($request->name);
        $categories = Category::where('slug',$slug)->get()->count();
        if($categories == 0){
            $url = $slug;
        }else{
            $url = $slug . '-' . Category::all()->count();
        }
        return $url;
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(),[
            'name'      => 'required|string|max:255',
            'status'    => 'required'
        ]);

        if($validator->fails()){
            return Response()->json([
                'status'    => 401,
                'errors'    => $validator->errors()->all()
            ]);
        }

        
        
        $category = new Category();
        $category->name = $request->name;
        $category->slug = $this->createCategoryURL($request);
        $category->status = $request->status;
        $category->keywords = convert_array_to_string($request);
        $category->meta_title = $request->meta_title;
        $category->meta_description = $request->meta_description;

        if($request->hasFile('image')){
            $imageValidate = Validator::make($request->all(),[
                'image'     => 'mimes:jpg,png,jpeg,gif,svg|image'
            ]);
            if($imageValidate->fails()){
                return Response()->json([
                    'status'    => 401,
                    'errors'    => $imageValidate->errors()->all()
                ]);
            }
            $image = $request->file('image');
            $name = $image->getClientOriginalName() . time() . '_rh' . '.jpg';
            $image_path = storage_path('app/public/category/' . $name);
            $manager = new ImageManager(new Driver());
            $manager->read($image)->save($image_path,70);
            $category->image = $name;
        }

        if($category->save()){
            return Response()->json([
                'status'    => 200,
                'message'   => 'Category Saved Successfully'
            ]);
        }else{
            return Response()->json([
                'status'    => 403,
                'message'   => 'Something went wrong. Please try again.'
            ]);
        }
    }


    public function editCategory($id){
        return view('Backend.Layout');
    }

    public function edit($id){
        $category = Category::find($id);
        if($category){
            return Response()->json([
                'status'    => 200,
                'category'  => $category
            ]);
        }else{
            return Response()->json([
                'status'    => 404,
                'message'   => 'Category not found'
            ]);
        }
    }

    public function parentCategory(){
        $categories = Category::all()->where('status',1);
        return Response()->json([
            'status'        => 200,
            'categories'    => $categories
        ]);
    }

    public function updateCategory(Request $request){
        return Response()->json($request->all());
    }


    
    public function all(){
        $categories = Category::all();
        return Response()->json([
            'status'        => 200,
            'categories'    => $categories
        ]);
    }
}