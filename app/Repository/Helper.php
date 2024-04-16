<?php
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

if (!function_exists('convert_array_to_string')) {
    function convert_array_to_string($request)
    {
        $data = '';
        if($request->keywords != null && is_array($request->keywords)){
            foreach ($request->keywords as $index => $keyword) {
                if ($index != count($request->keywords) - 1) {
                    $data .= $keyword . ',';
                }
                if ($index == count($request->keywords) - 1) {
                    $data .= $keyword;
                }
            }
        }elseif($request->keywords != null){
            $data = $request->keywords;
        }

        return $data;
    }
}

if(!function_exists('upload_image')){
    function upload_image(string $path, $image){
        $name = 'image_' . md5(time()) . '_rh.jpg';
        $dir = storage_path('app/public/' . $path . '/' . $name);
        if(!File::exists(storage_path('app/public/' . $path))){
            File::makeDirectory(storage_path('app/public/' . $path));
        }
        $driver = new ImageManager(new Driver());
        $driver->read($image)->save($dir,70);
        return $name;
    }
}
