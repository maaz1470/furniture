<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\SubCategory;
use App\Models\SubSubCategory;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;
use Illuminate\Support\Str;


class CategoryController extends Controller
{
    public function category()
    {
        return view('Backend.Layout');
    }

    public function add()
    {
        return view('Backend.Layout');
    }

    protected function createCategoryURL($request)
    {
        $slug = Str::slug($request->name);
        $categories = Category::where('slug', $slug)->get()->count();
        if ($categories == 0) {
            $url = $slug;
        } else {
            $url = $slug . '-' . Category::all()->count();
        }
        return $url;
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'      => 'required|string|max:255',
            'status'    => 'required'
        ]);

        if ($validator->fails()) {
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

        if ($request->hasFile('image')) {
            $imageValidate = Validator::make($request->all(), [
                'image'     => 'mimes:jpg,png,jpeg,gif,svg|image'
            ]);
            if ($imageValidate->fails()) {
                return Response()->json([
                    'status'    => 401,
                    'errors'    => $imageValidate->errors()->all()
                ]);
            }
            $image = $request->file('image');
            $name = $image->getClientOriginalName() . time() . '_rh' . '.jpg';
            $path = 'app/public/category';
            if (!File::exists(storage_path($path))) {
                File::makeDirectory(storage_path('app/public/category'));
            }
            $image_path = storage_path($path . '/' . $name);
            $manager = new ImageManager(new Driver());
            $manager->read($image)->save($image_path, 70);
            $category->image = $name;
        }

        if ($category->save()) {
            return Response()->json([
                'status'    => 200,
                'message'   => 'Category Saved Successfully'
            ]);
        } else {
            return Response()->json([
                'status'    => 403,
                'message'   => 'Something went wrong. Please try again.'
            ]);
        }
    }


    public function editCategory($id)
    {
        return view('Backend.Layout');
    }

    public function edit($id)
    {
        $category = Category::find($id);
        if ($category) {
            return Response()->json([
                'status'    => 200,
                'category'  => $category
            ]);
        } else {
            return Response()->json([
                'status'    => 404,
                'message'   => 'Category not found'
            ]);
        }
    }

    public function parentCategory()
    {
        $categories = DB::table('categories')->orWhere('status',1)->where('parent_id',null)->get();
        return Response()->json([
            'status'        => 200,
            'categories'    => $categories
        ]);
    }

    public function updateCategory(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'      => 'required|string|max:255',
            'id'        => 'required',
            'slug'      => 'required|string|max:255'
        ]);

        if ($validator->fails()) {
            return Response()->json([
                'status'    => 401,
                'errors'    => $validator->errors()->all()
            ]);
        }
        $category = Category::where('id', $request->id)->get()->first();
        $category->name = $request->name;
        if ($category->slug == $request->slug) {
            $category->slug = $request->slug;
        } else {
            $slugValidator = Validator::make($request->all(), [
                'slug'  => 'unique:categories.slug'
            ]);
            if ($slugValidator->fails()) {
                return Response()->json([
                    'status'    => 401,
                    'errors'    => $slugValidator->errors()->all()
                ]);
            }
            $slug = $this->createCategoryURL($request);
            $category->slug = $slug;
        }
        if ($request->hasFile('image')) {
            $imageValidator = Validator::make($request->all(), [
                'image' => 'mimes:jpg,png,gif,svg,jpeg'
            ]);
            if ($imageValidator->fails()) {
                return Response()->json([
                    'status'    => 401,
                    'errors'    => $imageValidator->errors()->all()
                ]);
            }
            $image = $request->file('image');
            $name = $image->getClientOriginalName() . time() . '_rh' . '.jpg';
            $image_path = storage_path('app/public/category/' . $name);
            $manager = new ImageManager(new Driver());
            $manager->read($image)->save($image_path, 70);
            $category->image = $name;
        }
        $category->status = $request->status;
        $category->meta_title = $request->meta_title;
        $category->meta_description = $request->meta_description;
        $category->keywords = convert_array_to_string($request);
        if ($category->save()) {
            return Response()->json([
                'status'    => 200,
                'message'   => 'Category update successfully'
            ]);
        } else {
            return Response()->json([
                'status'    => 402,
                'message'   => 'Something went wrong. Please try again.'
            ]);
        }
    }



    public function parentCategories()
    {
        $categories = DB::table('categories')->where('parent_id', null)->orderByDesc('id')->get();
        return Response()->json([
            'status'        => 200,
            'categories'    => $categories
        ]);
    }

    public function deleteCategory($id)
    {
        $category = Category::where('id', $id)->get()->first();
        if ($category) {
            if (file_exists(storage_path('app/public/category/' . $category->image))) {
                unlink(storage_path('app/public/category/' . $category->image));
            }
            $category->delete();
            return Response()->json([
                'status'    => 200,
                'message'   => 'Category Delete Successfully'
            ]);
        } else {
            return Response()->json([
                'status'    => 404,
                'message'   => 'Category not found.'
            ]);
        }
    }


    // Sub Category Function Start Here

    public function subCategoryAll()
    {
        return view('Backend.Layout');
    }


    public function subCategoryAdd()
    {
        return view('Backend.Layout');
    }

    public function subCategoryStore(Request $request){
        $validator = Validator::make($request->all(),[
            'name'              => 'required|string|max:255',
            'status'            => 'required',
            "parent_category"   => 'required'
        ]);
        if($validator->fails()){
            return Response()->json([
                'status'    => 401,
                'errors'    => $validator->errors()->all()
            ]);
        }
        $category = new SubCategory();
        $category->name = $request->name;
        $category->slug = $this->createCategoryURL($request);
        $category->status = $request->status;
        $category->parent_id = $request->parent_category;
        $category->meta_title = $request->meta_title;
        $category->keywords = convert_array_to_string($request);
        $category->meta_description = $request->meta_description;
        if($request->hasFile('image')){
            $imageValidator = Validator::make($request->all(),[
                'image'     => 'mimes:jpg,png,jpeg,gif,svg'
            ]);
            if($imageValidator->fails()){
                return Response()->json([
                    'status'    => 401,
                    'errors'    => $imageValidator->errors()->all()
                ]);
            }
            $image = upload_image('sub-category',$request->file('image'));
            $category->image = $image;
            
        }
        if($category->save()){
            return Response()->json([
                'status'    => 200,
                'message'   => 'Category Saved Successfully'
            ]);
        }
    }


    // All Sub Categories
    public function allSubCategory(){
        $categories = SubCategory::with('parentCategory')->get();
        return Response()->json([
            'status'        => 200,
            'categories'    => $categories
        ]);
    }
    // Sub Category Edit Layout
    public function subCategoryEditLayout(){
        return view('Backend.Layout');
    }
    // Sub Category Edit
    public function editSubCategory($id){
        $category = SubCategory::where('id',$id)->get()->first();
        if($category){
            return Response()->json([
                'status'    => 200,
                'category'  => $category
            ]);
        }else{
            return Response()->json([
                'status'    => 404,
                'message'   => 'Category not found.'
            ]);
        }
    }
    // Sub Category Update
    public function updateSubCategory(Request $request){
        $validator = Validator::make($request->all(),[
            'name'              => 'required|string|max:255',
            'slug'              => 'required|max:255',
            'status'            => 'required',
            'parent_category'   => 'required'
        ]);

        if($validator->fails()){
            return Response()->json([
                'status'    => 401,
                'errors'    => $validator->errors()->all()
            ]);
        }

        $category = SubCategory::where('id',$request->id)->get()->first();
        if($category){
            $category->name = $request->name;
            $category->status = $request->status;
            if($category->slug == $request->slug){
                $category->slug = Str::slug($request->slug);
            }else{
                $slugValidator = Validator::make($request->all(),[
                    'slug'  => 'unique:categories,slug'
                ]);
                if($slugValidator->fails()){
                    return Response()->json([
                        'status'    => 401,
                        'errors'    => $slugValidator->errors()->all()
                    ]);
                }
                $category->slug = $this->createCategoryURL($request);

            }
            $category->parent_id = $request->parent_category;
            $category->meta_title = $request->meta_title;
            $category->meta_description = $request->meta_description;
            $category->keywords = $request->keywords;

            if($request->hasFile('image')){
                $imageValidator = Validator::make($request->all(),[
                    'image'     => 'mimes:jpg,png,jpeg,gif'
                ]);
                if($imageValidator->fails()){
                    return Response()->json([
                        'status'    => 401,
                        'errors'    => $imageValidator->errors()->all()
                    ]);
                }
                if($category->image){
                    if(File::exists(storage_path('app/public/sub-category/' . $category->image))){
                        unlink(storage_path('app/public/sub-category/' . $category->image));
                    }
                }
                $image = upload_image('sub-category',$request->file('image'));
                $category->image = $image;
            }
            if($category->save()){
                return Response()->json([
                    'status'    => 200,
                    'message'   => 'Category update successfully'
                ]);
            }else{
                return Response()->json([
                    'status'    => 402,
                    'message'   => 'Something went wrong. Please try again.'
                ]);
            }

        }else{
            return Response()->json([
                'status'    => 404,
                'message'   => 'Category not found.'
            ]);
        }
    }

    // Delete Category
    public function subCategoryDelete($id){
        $category = SubCategory::where('id',$id)->get()->first();
        if($category){
            if(File::exists(storage_path('app/public/sub-category/' . $category->image))){
                unlink(storage_path('app/public/sub-category/' . $category->image));
            }
            $category->delete();
            return Response()->json([
                'status'    => 200,
                'message'   => 'Category Delete Successfully'
            ]);
        }else{
            return Response()->json([
                'status'    => 404,
                'message'   => 'Category not found'
            ]);
        }
    }




    // Sub Sub Category Section Start Here

    public function subSubCategoryPage(){
        return view('Backend.Layout');
    }

    // Add Sub Sub Category Page

    public function addSubSubCategoryPage(){
        return view('Backend.Layout');
    }

    public function subParentCategory(){
        $categories = SubCategory::all()->where('status',1);
        return Response()->json([
            'status'        => 200,
            'categories'    => $categories
        ]);
    }

    // All sub Sub Category

    public function allSubSubCategory(){
        $categories = SubSubCategory::with('parentCategories')->get();
        return Response()->json([
            'status'        => 200,
            'categories'    => $categories
        ]);
    }

    public function subSubCategoryStore(Request $request){
        $validator = Validator::make($request->all(),[
            'name'              => 'required|string|max:255',
            'status'            => 'required',
            "parent_category"   => 'required'
        ]);
        if($validator->fails()){
            return Response()->json([
                'status'    => 401,
                'errors'    => $validator->errors()->all()
            ]);
        }
        $category = new SubSubCategory();
        $category->name = $request->name;
        $category->slug = $this->createCategoryURL($request);
        $category->status = $request->status;
        $category->parent_id = $request->parent_category;
        $category->meta_title = $request->meta_title;
        $category->keywords = convert_array_to_string($request);
        $category->meta_description = $request->meta_description;
        if($request->hasFile('image')){
            $imageValidator = Validator::make($request->all(),[
                'image'     => 'mimes:jpg,png,jpeg,gif,svg'
            ]);
            if($imageValidator->fails()){
                return Response()->json([
                    'status'    => 401,
                    'errors'    => $imageValidator->errors()->all()
                ]);
            }
            $image = upload_image('sub-sub-category',$request->file('image'));
            $category->image = $image;
            
        }
        if($category->save()){
            return Response()->json([
                'status'    => 200,
                'message'   => 'Category Saved Successfully'
            ]);
        }
    }

    // Edit Sub Sub Category Page Layout
    public function editSubSubCategoryPage(){
        return view('Backend.Layout');
    }

    // Edit Sub Sub Category

    public function subSubCategoryEdit($id){
        $category = SubSubCategory::where('id',$id)->get()->first();
        if($category){
            return Response()->json([
                'status'    => 200,
                'category'  => $category
            ]);
        }else {
            return Response()->json([
                'status'    => 404,
                'message'   => 'Category not found.'
            ]);
        }
    }

    // Update Sub Sub Category

    public function updateSubSubCategory(Request $request){
        $validator = Validator::make($request->all(),[
            'name'              => 'required|string|max:255',
            'slug'              => 'required|max:255',
            'status'            => 'required',
            'parent_category'   => 'required'
        ]);

        if($validator->fails()){
            return Response()->json([
                'status'    => 401,
                'errors'    => $validator->errors()->all()
            ]);
        }

        $category = SubSubCategory::where('id',$request->id)->get()->first();
        if($category){
            $category->name = $request->name;
            $category->status = $request->status;
            if($category->slug == $request->slug){
                $category->slug = Str::slug($request->slug);
            }else{
                $slugValidator = Validator::make($request->all(),[
                    'slug'  => 'unique:categories,slug'
                ]);
                if($slugValidator->fails()){
                    return Response()->json([
                        'status'    => 401,
                        'errors'    => $slugValidator->errors()->all()
                    ]);
                }
                $category->slug = $this->createCategoryURL($request);

            }
            $category->parent_id = $request->parent_category;
            $category->meta_title = $request->meta_title;
            $category->meta_description = $request->meta_description;
            $category->keywords = $request->keywords;

            if($request->hasFile('image')){
                $imageValidator = Validator::make($request->all(),[
                    'image'     => 'mimes:jpg,png,jpeg,gif'
                ]);
                if($imageValidator->fails()){
                    return Response()->json([
                        'status'    => 401,
                        'errors'    => $imageValidator->errors()->all()
                    ]);
                }
                if($category->image){
                    if(File::exists(storage_path('app/public/sub-sub-category/' . $category->image))){
                        unlink(storage_path('app/public/sub-sub-category/' . $category->image));
                    }
                }
                $image = upload_image('sub-sub-category',$request->file('image'));
                $category->image = $image;
            }
            if($category->save()){
                return Response()->json([
                    'status'    => 200,
                    'message'   => 'Category update successfully'
                ]);
            }else{
                return Response()->json([
                    'status'    => 402,
                    'message'   => 'Something went wrong. Please try again.'
                ]);
            }

        }else{
            return Response()->json([
                'status'    => 404,
                'message'   => 'Category not found.'
            ]);
        }
    }

    // Delete Sub Sub Category
    public function deleteSubSubCategory($id){
        $category = SubSubCategory::where('id',$id)->get()->first();
        if($category){
            if(File::exists(storage_path('app/public/sub-sub-category/' . $category->image))){
                unlink(storage_path('app/public/sub-sub-category/' . $category->image));
            }
            $category->delete();
            return Response()->json([
                'status'    => 200,
                'message'   => 'Category Delete Successfully'
            ]);
        }else{
            return Response()->json([
                'status'    => 404,
                'message'   => 'Category not found'
            ]);
        }
    }
}
